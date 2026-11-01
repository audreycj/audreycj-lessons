// IT 110 real-life photos (chat 44). All from Wikimedia Commons, free licenses, shown straight from Wikimedia
// (500px thumbnails, lazy-loaded). Each photo shows a credit line; photoCredits() lists them all in References.
// To add one: copy the 500px thumbnail URL, the file page, the license, and the author from the file's Commons page.
const T = 'https://thumb.wikimedia.org/wikipedia/commons/thumb/';
const C = 'https://commons.wikimedia.org/wiki/File:';
export const photos = {
  kbMembrane: { src: T + '6/63/Croatian_computer_keyboard_3786.JPG/500px-Croatian_computer_keyboard_3786.JPG', w: 500, h: 375, page: C + 'Croatian_computer_keyboard_3786.JPG', lic: 'CC BY-SA 3.0', by: 'Desirebeast', alt: 'A full-size desktop keyboard.' },
  kbLaptop: { src: T + '1/1e/Backlit_laptop_keyboard_%28Unsplash%29.jpg/500px-Backlit_laptop_keyboard_%28Unsplash%29.jpg', w: 500, h: 333, page: C + 'Backlit_laptop_keyboard_(Unsplash).jpg', lic: 'CC0', by: 'Markus Petritz', alt: 'Thin, low keys on a laptop.' },
  kbMech: { src: T + 'd/df/Mechanical_keyboard_example.jpg/500px-Mechanical_keyboard_example.jpg', w: 500, h: 246, page: C + 'Mechanical_keyboard_example.jpg', lic: 'CC BY-SA 4.0', by: 'Thanasis Termitzoglou', alt: 'A mechanical keyboard with tall keys and colored lights.' },
  kbOnscreen: { src: T + 'c/ce/Gboard_screenshot.jpg/500px-Gboard_screenshot.jpg', w: 500, h: 1083, page: C + 'Gboard_screenshot.jpg', lic: 'CC BY-SA 4.0', by: 'Rodney Araujo', alt: 'A phone screen showing an on-screen keyboard.' },
  kbWireless: { src: T + '4/41/Apple-wireless-keyboard.jpg/500px-Apple-wireless-keyboard.jpg', w: 500, h: 333, page: C + 'Apple-wireless-keyboard.jpg', lic: 'CC BY-SA 4.0', by: 'Marcin Wieclaw', alt: 'A slim white wireless keyboard with no cable.' },
  kbErgo: { src: T + 'f/ff/New_ergonimic_keyboard_%26_mouse.jpg/500px-New_ergonimic_keyboard_%26_mouse.jpg', w: 500, h: 375, page: C + 'New_ergonimic_keyboard_%26_mouse.jpg', lic: 'CC BY 2.0', by: 'idalingi', alt: 'A split ergonomic keyboard on a desk: the two halves are angled apart.' },
  mouseBall: { src: T + '8/83/Apple_Desktop_Bus_Mouse_ball_and_recess.jpg/500px-Apple_Desktop_Bus_Mouse_ball_and_recess.jpg', w: 500, h: 375, page: C + 'Apple_Desktop_Bus_Mouse_ball_and_recess.jpg', lic: 'Public domain', by: 'Daniel Beardsmore', alt: 'An opened old ball mouse: a gray rubber ball beside the circuit board.' },
  mouseOptical: { src: T + 'e/ed/Optical_mouse_sensor.jpg/500px-Optical_mouse_sensor.jpg', w: 500, h: 315, page: C + 'Optical_mouse_sensor.jpg', lic: 'CC BY-SA 4.0', by: 'Harikrishnanskt', alt: 'The underside of an optical mouse with a red light shining.' },
  touchpad: { src: T + 'b/b3/Touchpad_HP.JPG/500px-Touchpad_HP.JPG', w: 500, h: 375, page: C + 'Touchpad_HP.JPG', lic: 'CC BY-SA 3.0', by: 'Okno', alt: 'A laptop touchpad with two buttons below it.' },
  touchResist: { src: T + 'e/e4/Nintendo-3DS-XL-angled.jpg/500px-Nintendo-3DS-XL-angled.jpg', w: 500, h: 399, page: C + 'Nintendo-3DS-XL-angled.jpg', lic: 'Public domain', by: 'Evan-Amos', alt: 'An open handheld game console with two screens.' },
  touchCap: { src: T + '2/20/Scrolling_on_phone_%28cropped%29.jpg/500px-Scrolling_on_phone_%28cropped%29.jpg', w: 500, h: 500, page: C + 'Scrolling_on_phone_(cropped).jpg', lic: 'CC BY-SA 2.0', by: 'Japanexperterna.se', alt: 'A finger scrolling on a phone screen.' },
  stylus: { src: T + 'b/b6/Wacom_Intuos_Pro_Tablet_with_Stylus_and_Nib_%2832569722588%29.jpg/500px-Wacom_Intuos_Pro_Tablet_with_Stylus_and_Nib_%2832569722588%29.jpg', w: 500, h: 335, page: C + 'Wacom_Intuos_Pro_Tablet_with_Stylus_and_Nib_(32569722588).jpg', lic: 'CC BY 2.0', by: 'Tony Webster', alt: 'A digital pen lying on its matching drawing tablet.' },
  trackball: { src: T + '7/7d/Logitech_trackball_mouse_%287000976232%29.jpg/500px-Logitech_trackball_mouse_%287000976232%29.jpg', w: 500, h: 500, page: C + 'Logitech_trackball_mouse_(7000976232).jpg', lic: 'CC BY 2.0', by: 'allegro Takahi', alt: 'A trackball with a blue ball on its side, turned by the thumb.' },
  bcScanner: { src: T + '1/17/Honeywell_4600g-8661.jpg/500px-Honeywell_4600g-8661.jpg', w: 500, h: 333, page: C + 'Honeywell_4600g-8661.jpg', lic: 'CC BY-SA 4.0', by: 'Raimond Spekking', alt: 'A handheld barcode reader shaped like a gun.' },
  qrPhone: { src: T + 'e/e0/Gedenkort_an_das_Deportationslager_K%C3%B6ln-M%C3%BCngersdorf_-5696.jpg/500px-Gedenkort_an_das_Deportationslager_K%C3%B6ln-M%C3%BCngersdorf_-5696.jpg', w: 500, h: 333, page: C + 'Gedenkort_an_das_Deportationslager_K%C3%B6ln-M%C3%BCngersdorf_-5696.jpg', lic: 'CC BY-SA 4.0', by: 'Raimond Spekking', alt: 'A phone camera pointed at a QR code on a sign.' },
  rfidTags: { src: T + 'e/e4/13.56MHz_RFID_tags.jpg/500px-13.56MHz_RFID_tags.jpg', w: 500, h: 375, page: C + '13.56MHz_RFID_tags.jpg', lic: 'CC BY-SA 4.0', by: 'Anonymous Agent', alt: 'RFID tags: two white cards and three blue key fobs.' },
  rfidReader: { src: T + '3/35/BioAffix_Cardreader_Wall.png/500px-BioAffix_Cardreader_Wall.png', w: 500, h: 313, page: C + 'BioAffix_Cardreader_Wall.png', lic: 'CC BY 4.0', by: 'Sezeruludag', alt: 'A small black RFID card reader for mounting on a wall.' },
  fpReader: { src: T + '6/67/Fingerprint_scanner_identification.jpg/500px-Fingerprint_scanner_identification.jpg', w: 500, h: 375, page: C + 'Fingerprint_scanner_identification.jpg', lic: 'CC BY-SA 3.0', by: 'Rachmaninoff', alt: 'A finger pressed on a fingerprint reader that glows red.' },
  fpClock: { src: T + '4/4b/Fingerprint_Scanner_Mercato.JPG/500px-Fingerprint_Scanner_Mercato.JPG', w: 500, h: 667, page: C + 'Fingerprint_Scanner_Mercato.JPG', lic: 'CC BY-SA 4.0', by: 'Ominae', alt: 'A wall-mounted fingerprint scanner where employees clock in.' },
  flatbed: { src: 'https://upload.wikimedia.org/wikipedia/commons/e/e3/Scanner.view.750pix.jpg', w: 460, h: 550, page: C + 'Scanner.view.750pix.jpg', lic: 'Public domain', by: 'Boffy b and Arpingstone', alt: 'A flatbed scanner with its lid open, showing the glass.' },
  sheetfed: { src: T + '8/8d/Fujitsu_ScanSnap_fi-5100C_tray_open.jpeg/500px-Fujitsu_ScanSnap_fi-5100C_tray_open.jpeg', w: 500, h: 575, page: C + 'Fujitsu_ScanSnap_fi-5100C_tray_open.jpeg', lic: 'CC BY-SA 3.0', by: 'Zuzu', alt: 'A small sheet-fed document scanner with its paper tray open.' },
  mfp: { src: T + '9/99/HP_Deskjet_F380_Printer_and_Scanner.jpg/500px-HP_Deskjet_F380_Printer_and_Scanner.jpg', w: 500, h: 374, page: C + 'HP_Deskjet_F380_Printer_and_Scanner.jpg', lic: 'CC BY-SA 2.0', by: 'Alexander Whillas', alt: 'A home printer with a scanner lid on top.' },
  camPhone: { src: T + '8/88/Rear_view_of_Google_Pixel_6_Pro.jpg/500px-Rear_view_of_Google_Pixel_6_Pro.jpg', w: 500, h: 667, page: C + 'Rear_view_of_Google_Pixel_6_Pro.jpg', lic: 'CC0', by: 'Miyako Fujimiya', alt: 'The back of a smartphone with a bar of camera lenses.' },
  webcam: { src: T + 'f/f5/Fancy_webcam_on_computer_screen.jpg/500px-Fancy_webcam_on_computer_screen.jpg', w: 500, h: 281, page: C + 'Fancy_webcam_on_computer_screen.jpg', lic: 'CC BY-SA 4.0', by: 'Peter Placzek', alt: 'A USB webcam resting on top of a computer monitor.' },
  dslr: { src: T + 'a/a9/2016_Sony_DSLR-A700.jpg/500px-2016_Sony_DSLR-A700.jpg', w: 500, h: 384, page: C + '2016_Sony_DSLR-A700.jpg', lic: 'CC BY-SA 4.0', by: 'Jacek Halicki', alt: 'A DSLR camera with a large lens.' },
  micDyn: { src: T + '1/10/SennheiserMD46_HandHeld_Cardiod.JPG/500px-SennheiserMD46_HandHeld_Cardiod.JPG', w: 500, h: 375, page: C + 'SennheiserMD46_HandHeld_Cardiod.JPG', lic: 'Public domain', by: 'Jana C.', alt: 'A black handheld microphone.' },
  micCond: { src: T + '3/30/AKG_C214_condenser_microphone_with_H85_shock_mount.jpg/500px-AKG_C214_condenser_microphone_with_H85_shock_mount.jpg', w: 500, h: 707, page: C + 'AKG_C214_condenser_microphone_with_H85_shock_mount.jpg', lic: 'CC BY-SA 3.0', by: 'Lucasbosch', alt: 'A studio condenser microphone hanging in a spring mount.' },
  micUsb: { src: T + 'e/e2/Rode_NT-USB.jpg/500px-Rode_NT-USB.jpg', w: 500, h: 667, page: C + 'Rode_NT-USB.jpg', lic: 'CC BY-SA 3.0', by: 'Nicolas Rück (WMDE)', alt: 'A USB microphone on a small desk stand.' },
  lav: { src: T + 'c/cf/Lavalier_microphone_on_shirt.jpg/500px-Lavalier_microphone_on_shirt.jpg', w: 500, h: 307, page: C + 'Lavalier_microphone_on_shirt.jpg', lic: 'CC BY-SA 2.0', by: 'Gage Skidmore', alt: 'A tiny microphone clipped to a shirt.' },
  headset: { src: T + '7/74/Headphones_with_Microphone.jpg/500px-Headphones_with_Microphone.jpg', w: 500, h: 375, page: C + 'Headphones_with_Microphone.jpg', lic: 'CC BY-SA 3.0', by: 'Zephyris', alt: 'A headset: headphones with a small microphone on an arm.' },
};
const LIC = {
  'CC BY 2.0': 'https://creativecommons.org/licenses/by/2.0/', 'CC BY 4.0': 'https://creativecommons.org/licenses/by/4.0/',
  'CC BY-SA 2.0': 'https://creativecommons.org/licenses/by-sa/2.0/', 'CC BY-SA 3.0': 'https://creativecommons.org/licenses/by-sa/3.0/', 'CC BY-SA 4.0': 'https://creativecommons.org/licenses/by-sa/4.0/',
  CC0: 'https://creativecommons.org/publicdomain/zero/1.0/',
};
const esc = (s) => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
const credit = (p) => `Photo: ${esc(p.by)}, ` + (LIC[p.lic] ? `<a href="${LIC[p.lic]}" target="_blank" rel="noopener">${p.lic}</a>` : 'public domain') + `, via <a href="${p.page}" target="_blank" rel="noopener">Wikimedia Commons</a>`;
/** A real-life photo with an optional caption and its credit line. kind: '' (full figure) or 'card' (inside an fn-card). */
export function photo(key, cap = '', kind = '') {
  const p = photos[key];
  return `<figure class="photo${kind ? ' photo-' + kind : ''}"><img src="${p.src}" width="${p.w}" height="${p.h}" alt="${esc(p.alt)}" loading="lazy" decoding="async">`
    + `<figcaption>${cap ? `<span class="ph-cap">${cap}</span> ` : ''}<span class="ph-credit">${credit(p)}</span></figcaption></figure>`;
}
/** Two or more photos side by side (one column on phones). items: [key, caption] */
export const photoRow = (items) => `<div class="photo-row">${items.map(([k, c]) => photo(k, c)).join('')}</div>`;
/** <li> list of every photo used on a page, for the References. */
export const photoCredits = (keys) => keys.map((k) => { const p = photos[k]; return `<li>${esc(p.alt.replace(/\.$/, ''))}: ${credit(p).replace('Photo: ', '')}.</li>`; }).join('');
