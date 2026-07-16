const fs = require('fs');
const path = require('path');

const replacements = [
  // Email
  { regex: /circle5\.nothingness@proton\.me/g, replaceJsx: '{process.env.REACT_APP_CONTACT_EMAIL}', replaceHtml: '%REACT_APP_CONTACT_EMAIL%' },
  // Phone raw
  { regex: /\+918902460513/g, replaceJsx: '{process.env.REACT_APP_CONTACT_PHONE_RAW}', replaceHtml: '%REACT_APP_CONTACT_PHONE_RAW%' },
  // Phone formatted
  { regex: /\+91 89024 60513/g, replaceJsx: '{process.env.REACT_APP_CONTACT_PHONE}', replaceHtml: '%REACT_APP_CONTACT_PHONE%' },
  // Phone formatted with hyphen
  { regex: /\+91-89024 60513/g, replaceJsx: '{process.env.REACT_APP_CONTACT_PHONE}', replaceHtml: '%REACT_APP_CONTACT_PHONE%' },
  // Whatsapp
  { regex: /\+91 82402 13971/g, replaceJsx: '{process.env.REACT_APP_WHATSAPP_PHONE}', replaceHtml: '%REACT_APP_WHATSAPP_PHONE%' },
  // Location
  { regex: /Hazra More, Kalighat/g, replaceJsx: '{process.env.REACT_APP_LOCATION}', replaceHtml: '%REACT_APP_LOCATION%' },
  { regex: /Kolkata, Hazra More, Kalighat/g, replaceJsx: 'Kolkata, {process.env.REACT_APP_LOCATION}', replaceHtml: 'Kolkata, %REACT_APP_LOCATION%' },
  // Calendly
  { regex: /https:\/\/calendly\.com\/circle5-nothingness\/?/g, replaceJsx: '{process.env.REACT_APP_CALENDLY_URL}', replaceHtml: '%REACT_APP_CALENDLY_URL%' },
  // GA ID
  { regex: /G-F8JF8K7FB0/g, replaceJsx: '{process.env.REACT_APP_GA_ID}', replaceHtml: '%REACT_APP_GA_ID%' }
];

const filesToProcess = [
  'src/App.jsx',
  'src/components/layout/Footer.jsx',
  'src/components/sections/CounsellingSection.jsx',
  'src/components/sections/TutoringSection.jsx',
  'public/index.html'
];

filesToProcess.forEach(file => {
  const isHtml = file.endsWith('.html');
  const fullPath = path.join(__dirname, file);
  if (!fs.existsSync(fullPath)) {
    console.error(`File not found: ${fullPath}`);
    return;
  }
  
  let content = fs.readFileSync(fullPath, 'utf8');
  
  replacements.forEach(({ regex, replaceJsx, replaceHtml }) => {
    // Special handling for href="mailto:..." and href="tel:..." inside JSX
    // because JSX needs href={`mailto:${process.env...}`} instead of href="mailto:{process.env...}"
    if (!isHtml) {
      content = content.replace(/href="mailto:circle5\.nothingness@proton\.me"/g, 'href={`mailto:${process.env.REACT_APP_CONTACT_EMAIL}`}')
      content = content.replace(/href="tel:\+918902460513"/g, 'href={`tel:${process.env.REACT_APP_CONTACT_PHONE_RAW}`}')
    }
    
    const replacement = isHtml ? replaceHtml : replaceJsx;
    content = content.replace(regex, replacement);
  });
  
  fs.writeFileSync(fullPath, content);
  console.log(`Processed ${file}`);
});
