import { fail, type Actions } from '@sveltejs/kit';
import { z } from 'zod';
import { Resend } from 'resend';
import { env } from '$env/dynamic/private';

const contactSchema = z.object({
	name: z.string().trim().min(2, 'Votre prénom est un peu court.'),
	email: z.string().trim().email('Cette adresse ne semble pas valide.'),
	subject: z.string().trim().min(2, 'Ajoutez un sujet court.').max(120),
	message: z.string().trim().min(20, 'Racontez-moi un peu plus (20 caractères minimum).').max(4000),
	// honeypot
	website: z.string().max(0).optional()
});

export const actions: Actions = {
	default: async ({ request }) => {
		const data = await request.formData();
		const raw = {
			name: data.get('name'),
			email: data.get('email'),
			subject: data.get('subject'),
			message: data.get('message'),
			website: data.get('website') ?? ''
		};

		const parsed = contactSchema.safeParse(raw);
		if (!parsed.success) {
			const errors: Record<string, string> = {};
			for (const issue of parsed.error.issues) {
				const key = issue.path[0];
				if (typeof key === 'string' && !errors[key]) errors[key] = issue.message;
			}
			return fail(400, {
				errors,
				values: {
					name: String(raw.name ?? ''),
					email: String(raw.email ?? ''),
					subject: String(raw.subject ?? ''),
					message: String(raw.message ?? '')
				}
			});
		}

		const apiKey = env.RESEND_API_KEY;
		const to = env.CONTACT_EMAIL ?? 'zelie@louvencourt.com';
		const from = env.CONTACT_FROM ?? 'Portfolio <contact@louvencourt.com>';

		if (apiKey) {
			try {
				const resend = new Resend(apiKey);
				await resend.emails.send({
					from,
					to,
					replyTo: parsed.data.email,
					subject: `[Portfolio] ${parsed.data.subject}`,
					text: `De : ${parsed.data.name} <${parsed.data.email}>\n\n${parsed.data.message}`
				});
			} catch (err) {
				console.error('[contact] Resend error', err);
				const errors: Record<string, string> = {
					form: "Impossible d'envoyer votre message pour l'instant. Réessayez dans quelques minutes."
				};
				return fail(500, { errors, values: parsed.data });
			}
		} else {
			console.warn('[contact] RESEND_API_KEY missing — message logged only:', parsed.data);
		}

		return { success: true };
	}
};
