// Minimal split-text helper — wraps chars/words/lines in spans so GSAP can animate them individually.
// Avoids the GSAP SplitText Club GreenSock dependency.

export type SplitMode = 'chars' | 'words' | 'lines';

export type SplitResult = {
	chars: HTMLSpanElement[];
	words: HTMLSpanElement[];
	lines: HTMLSpanElement[];
	revert: () => void;
};

export const splitText = (el: HTMLElement, modes: SplitMode[] = ['words']): SplitResult => {
	const originalHTML = el.innerHTML;
	const text = el.textContent ?? '';
	el.textContent = '';
	el.setAttribute('aria-label', text);

	const chars: HTMLSpanElement[] = [];
	const words: HTMLSpanElement[] = [];

	const wantsChars = modes.includes('chars');
	const wantsWords = modes.includes('words') || wantsChars;

	const tokens = text.split(/(\s+)/);
	tokens.forEach((token) => {
		if (/^\s+$/.test(token)) {
			el.appendChild(document.createTextNode(token));
			return;
		}
		if (!token) return;
		const word = document.createElement('span');
		word.className = 'st-word';
		word.style.display = 'inline-block';
		word.style.whiteSpace = 'nowrap';
		word.setAttribute('aria-hidden', 'true');

		if (wantsChars) {
			for (const ch of token) {
				const c = document.createElement('span');
				c.className = 'st-char';
				c.style.display = 'inline-block';
				c.textContent = ch;
				word.appendChild(c);
				chars.push(c);
			}
		} else {
			word.textContent = token;
		}

		el.appendChild(word);
		if (wantsWords) words.push(word);
	});

	// Lines are computed after layout by grouping words by their offsetTop.
	const lines: HTMLSpanElement[] = [];
	if (modes.includes('lines') && words.length) {
		const groups = new Map<number, HTMLSpanElement[]>();
		words.forEach((w) => {
			const top = Math.round(w.offsetTop);
			const arr = groups.get(top) ?? [];
			arr.push(w);
			groups.set(top, arr);
		});
		const sorted = [...groups.entries()].sort((a, b) => a[0] - b[0]);
		// Rebuild with line wrappers.
		el.textContent = '';
		sorted.forEach(([, wordsOnLine]) => {
			const line = document.createElement('span');
			line.className = 'st-line';
			line.style.display = 'block';
			line.style.overflow = 'hidden';
			const inner = document.createElement('span');
			inner.style.display = 'inline-block';
			wordsOnLine.forEach((w, i) => {
				inner.appendChild(w);
				if (i < wordsOnLine.length - 1) inner.appendChild(document.createTextNode(' '));
			});
			line.appendChild(inner);
			el.appendChild(line);
			lines.push(inner);
		});
	}

	const revert = () => {
		el.innerHTML = originalHTML;
	};

	return { chars, words, lines, revert };
};
