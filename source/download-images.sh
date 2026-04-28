#!/bin/bash
set -e
cd "$(dirname "$0")/images"

BASE="https://static.wixstatic.com/media"

dl() {
  local folder="$1"
  local id="$2"
  local out="$folder/${id%%~*}.${id##*.}"
  # Simpler: save with a cleaner filename
  local ext="png"
  [[ "$id" == *.jpg ]] && ext="jpg"
  [[ "$id" == *.jpeg ]] && ext="jpeg"
  [[ "$id" == *~mv2.jpg ]] && ext="jpg"
  [[ "$id" == *~mv2.jpeg ]] && ext="jpeg"
  [[ "$id" == *~mv2.png ]] && ext="png"
  # Use the ID (first 20 chars after underscore) as filename
  local shortname="${id#*_}"
  shortname="${shortname:0:24}"
  curl -sSL -o "$folder/${shortname}.${ext}" "$BASE/$id" && echo "OK: $folder/${shortname}.${ext}"
}

# COMMUN (logos)
dl commun "449457_ac47435b9f7345c9ad9aef22ce79b6a5~mv2.png"
dl commun "449457_ad92d70923b14d38a4949eaf2be16deb~mv2.png"
dl commun "449457_de89fdf056fc43fbbb2e031b97fd74f8~mv2.png"

# ACCUEIL
dl accueil "449457_00e578ba010c422290a36b73732d74f6f000.jpg"

# VERGELEGEN
dl vergelegen "449457_bd0f5ab128c644ab8085edfdf8649c74~mv2.jpg"
dl vergelegen "449457_dfbf043349a7465488db800732ee0694~mv2.png"
dl vergelegen "449457_1a45d4102fa84f51a7b73abfbacbf89e~mv2.png"
dl vergelegen "449457_61db3af99303469fada26c4ba279af69~mv2.png"
dl vergelegen "449457_237855f2166d42f8ad943d6d0116eed6~mv2.png"

# COCO CRUSH
dl coco-crush "449457_b5f8ae95e0984523bcad7b08e564cd7e~mv2.png"
dl coco-crush "449457_6737781fd25c46b9bb3789f0cfbf6b2e~mv2.png"
dl coco-crush "157553_d3f5b9c7378d4b2db670a1d580c680d7~mv2.jpg"
dl coco-crush "449457_80b61b5963644243942847b447b5bc6b~mv2.png"
dl coco-crush "449457_5084a842ac544cc6b4c4c54863dcc509~mv2.png"
dl coco-crush "449457_0285d2a1e9ac47779327613e78014812~mv2.png"

# PROXITE
dl proxite "449457_a785c08572af41b48401096f50d6afcb~mv2.png"
dl proxite "449457_85fd37e6620c466c89390ad7def1f64c~mv2.png"
dl proxite "449457_c4a2be171ff8495798a5297ec37dccb3~mv2.png"
dl proxite "449457_3f529c0913fc4ae0aa001b22eebc5a1c~mv2.png"
dl proxite "449457_928bf2c613004fd2b16640a469b1eb54~mv2.png"
dl proxite "449457_2c34e530a3fa466092d61b15708c6cd1~mv2.png"
dl proxite "449457_c5d98cbdc655470db9eef58bc1ac8014~mv2.png"
dl proxite "449457_dabe0541f3f84ae9b27822540166d67c~mv2.png"
dl proxite "449457_eb51494b8bbd46df816e74ebac9637df~mv2.png"
dl proxite "449457_7dc8c7d9dc774c7da4aa296b58db5e31~mv2.png"
dl proxite "449457_7d41efa294ef4c69a4bfad1931e1b337~mv2.png"

# LGM GLACIER
dl lgm-glacier "449457_ec45f3a9b1a84123aa6a6971682454ad~mv2.png"
dl lgm-glacier "449457_9d5599ea07b243d59500a91eeef52d50~mv2.png"
dl lgm-glacier "449457_95b6ee3129054768aad071fe48a99bf0~mv2.png"
dl lgm-glacier "449457_c14586264c1d499ba4b5eadc910fd390~mv2.png"
dl lgm-glacier "449457_01c204d979c54279832f1f8ed7075914~mv2.png"
dl lgm-glacier "449457_105756ad9991470b8b57e0074473acd2~mv2.png"
dl lgm-glacier "449457_43f559b3f8af4debbac0cb91d6c6ce13~mv2.png"
dl lgm-glacier "449457_1f0b799a5f8a4195a2fc4db58007aa9b~mv2.png"

# REGARDS CROISES
dl regards-croises "449457_c79c44c6b8ab4c11b4798d856d150412~mv2.png"
dl regards-croises "449457_4ded9c3de9884bf1a0a9ad4e1211ada2~mv2.png"
dl regards-croises "449457_a3d4120041f74d09840c9f2d69c9c669~mv2.png"
dl regards-croises "449457_9eb937721eca4fa09c8f108f6ca875c2~mv2.png"
dl regards-croises "449457_f9889a08824047439cba6902a892a995~mv2.png"
dl regards-croises "449457_9233ca252bb1484885f19e9159b03002~mv2.jpg"

# AIR AUSTRAL
dl air-austral "449457_25988bcc0d0a474a9de7bef0375814ba~mv2.jpg"
dl air-austral "449457_5fc15161047642318da93b7d285d16cc~mv2.png"
dl air-austral "449457_f6dfb7cef0ff4353bc13d48064d8846e~mv2.png"
dl air-austral "449457_8620ac75a4a44782967eb9731fb44d42~mv2.png"
dl air-austral "449457_6f15bab9321544c1a2d0978c03c9a1fd~mv2.png"
dl air-austral "449457_a938fb00beb940c3b2629dd710db77da~mv2.png"
dl air-austral "449457_443ab62f22834de89bf4f1a48633fe1d~mv2.jpg"

# FIAT 500
dl fiat-500 "449457_075c7ebcdfcc48c294be65f1b966c6ce~mv2.jpg"
dl fiat-500 "449457_148baf09a6ca45758e2f5d947529e97c~mv2.png"
dl fiat-500 "449457_54609e13122545178ed035468297fb15~mv2.png"
dl fiat-500 "449457_a152bdf5c5e3451294c0b157e47232d0~mv2.png"
dl fiat-500 "449457_99ed18bf79c34eb381958613f06a43cb~mv2.png"
dl fiat-500 "449457_3ea34dcb82524c84877a57fff273a5ec~mv2.png"

# LUEUR COSMETIQUE / NESPRESSO
dl lueur-cosmetique "449457_654b287e6a3d4f4796aa1dcdaac06b48~mv2.png"
dl lueur-cosmetique "449457_4a95a8ea1b7c499fbfb461e9215dcdce~mv2.png"
dl lueur-cosmetique "449457_8c736102db30430fad323c156f9a29d4~mv2.png"
dl lueur-cosmetique "449457_d7e5db3773354b07b0297de0ad196bd6~mv2.png"

# DENISE
dl denise "449457_8aa4a31c58e949f5adcbf5d3cfc41e07~mv2.jpg"
dl denise "449457_95253221161941e1bcdc134276c252f6~mv2.png"
dl denise "449457_5d9376468164469bb542edb90f5a96e8~mv2.png"
dl denise "449457_2285161eedd247ca82509b1a683cf8bb~mv2.png"
dl denise "449457_fcd554c3b3184a7a9352e713259ce014~mv2.jpg"
dl denise "449457_21ec9606e3db4be4878c6450788e7cc7~mv2.jpg"
dl denise "449457_ac767e8848f34d3a87e2fdc4b4afe2cf~mv2.png"
dl denise "449457_3b63f9f04e144edbac2c3abb7667b7d9~mv2.png"
dl denise "449457_a093e95f0a124a41ac393708da4fa4e9~mv2.png"
dl denise "449457_6f298ee19ede47e6849dee96ace7f3cd~mv2.png"
dl denise "449457_b86885d635a948d189f5f27c0eb24ef6~mv2.png"
dl denise "449457_258185f921bc49a5808be4e61a283e6f~mv2.png"
dl denise "449457_6830e07fce72468b8524c0122cb14448~mv2.png"
dl denise "449457_e7175d8ab8534d9ba6aacaa3e616a155~mv2.jpg"
dl denise "449457_2a9ebc811c4645469212e2932222af91~mv2.png"
dl denise "449457_213a52e37b1346daa58a1a10ca333d07~mv2.png"
dl denise "449457_71cbf398c7dc4ed48196052413c5519e~mv2.png"
dl denise "449457_2f66e2c525c34a07a04e7ebf3ca55cec~mv2.png"

# LE FIRST
dl le-first "449457_90476926796a4a6980cf280e717ea66b~mv2.jpg"
dl le-first "449457_475c1572226b4cb2b7bea4b77cc5d651~mv2.png"
dl le-first "449457_a7d38cd2d1684a348b86ab0b210c4beb~mv2.png"
dl le-first "449457_9f4c07b16df44eefbbd00b24406ffe59~mv2.png"
dl le-first "449457_5c326ecb365f443e85475524066436fa~mv2.png"
dl le-first "449457_474fd0133b6d4b79bedbdb4a751debc7~mv2.png"

# MERCHANDESIGN ELECTROPICALES
dl merchandesign-electropicales "449457_5739e43465604f2b89a419c2b27e451a~mv2.png"
dl merchandesign-electropicales "449457_24c476c619d140a3b0af9e49e073d981~mv2.png"
dl merchandesign-electropicales "449457_d069cb90d89a4e0e8eb13340fdc0b768~mv2.png"
dl merchandesign-electropicales "449457_6edcef80f5f24481be9162ac18fd541f~mv2.png"
dl merchandesign-electropicales "449457_95a96ab3bb434d49b8152645b310d353~mv2.png"
dl merchandesign-electropicales "449457_01246caac8a2468db6e97875aff84cd3f000.jpg"

# ELECTROPICALES 2025
dl electropicales-2025 "449457_89343309ebf14089aa544caa6869c200~mv2.jpg"
dl electropicales-2025 "449457_41f77d17912b44e8978b2ec1624acdac~mv2.png"
dl electropicales-2025 "449457_864ff3a4a8154a5881dc043f86b307f1~mv2.png"
dl electropicales-2025 "449457_7e3e0ca88bbd4e6ba0d3eda7c7153bdf~mv2.png"
dl electropicales-2025 "449457_59a747e87bfe4b4a85698beb3478fbe5~mv2.png"
dl electropicales-2025 "449457_6a5454820d0a4b0a9b4425ea9523b4bb~mv2.jpg"
dl electropicales-2025 "449457_66413459d19041df9156c2e7e53b6ba8~mv2.jpg"
dl electropicales-2025 "449457_66c45997c6df47999e7912dd337540cb~mv2.jpg"
dl electropicales-2025 "449457_a9252385312d4d0c9548fef415a57b6cf003.jpg"

# DELICIEUSE
dl delicieuse "449457_418cc5e65f364a6b81e17b422d315f6c~mv2.png"
dl delicieuse "449457_775f5c8339c549a9847e8dcd0ff94c4c~mv2.png"
dl delicieuse "449457_01668cf1582748a1b82954160db3aff6~mv2.png"
dl delicieuse "449457_585a05fa566e42fc8971b468f5bec24b~mv2.png"
dl delicieuse "449457_e192126d91c2474787fbc8441a3dbda6~mv2.png"
dl delicieuse "449457_83b6ce09094248a4a48b642c0dedeea2~mv2.png"
dl delicieuse "449457_db07db520869426a8078f0da2a10439d~mv2.png"
dl delicieuse "449457_26471ddef4af4eecbb8cef4ad184bcd9~mv2.png"
dl delicieuse "449457_dd513c0791054867bca1bdef72c88ca2~mv2.png"
dl delicieuse "449457_199d538d145e4943b51d729923f25840~mv2.png"
dl delicieuse "449457_5f5fecfe82ea427288f8208925295a42~mv2.png"
dl delicieuse "449457_c7e05e26d5ac4b48aa54943dc6082756~mv2.png"
dl delicieuse "449457_25a0b36b8db3465eb9ba114cc9a2448f~mv2.png"
dl delicieuse "449457_9d1fa3106ff34c409bf04182d3fb8237~mv2.png"

# CARTE BLANCHE
dl carte-blanche "449457_46dc23894da54c60990e2e11cb18f595~mv2.png"
dl carte-blanche "449457_4137fce6cead410ca45a600cbf4c2f5c~mv2.png"
dl carte-blanche "449457_e53679ef71414df282271187d02180a8~mv2.jpg"
dl carte-blanche "449457_e30eeb41c026480eb6f114161db13fc5~mv2.jpeg"
dl carte-blanche "449457_14a646418e4e4acd9525bc43e175cdcd~mv2.jpeg"

# ELECTROPICALES 2026
dl electropicales-2026 "449457_7d0f44345f374479a72f7808f96095fb~mv2.png"
dl electropicales-2026 "449457_d223ca0485d645aaa10040a854f46791~mv2.png"

# RUNBALL
dl runball "449457_dc3d07f710814b09bc55bad6f75fb980~mv2.jpg"
dl runball "449457_b5569876b7a54093b542e3810fe97cd3~mv2.jpg"
dl runball "449457_de8a379658b34980b81296f26bae0118~mv2.jpg"
dl runball "449457_e8f8e3fff29042d6af436d65a677b471~mv2.jpg"
dl runball "449457_83b59b50f619445d82d435ac51732173~mv2.jpg"
dl runball "449457_0e6da016ad624fd294e770b4385a1965~mv2.jpg"

echo "=== Terminé ==="
