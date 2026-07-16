const fs = require('fs');
const path = require('path');

const appPath = path.join(__dirname, 'src', 'App.jsx');
let app = fs.readFileSync(appPath, 'utf8');

// Replace the 2 Counselling Cards
// Card 1
let search = `<div className="glass-card hover-lift p-10 md:p-12 flex flex-col items-center text-center h-full group relative overflow-hidden">
              <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-transparent via-[#a89968] dark:via-[#d4af37] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              
              <div className="w-16 h-16 rounded-full flex items-center justify-center bg-stone-100 dark:bg-stone-900/50 group-hover:bg-[#a89968] dark:group-hover:bg-[#d4af37] mb-6 shadow-inner border border-stone-200 dark:border-white/5 transition-all duration-500 group-hover:scale-110">`;

let replace = `<GlowingCard className="glass-card hover-lift p-10 md:p-12 flex flex-col items-center text-center h-full">
              <div className="w-16 h-16 rounded-full flex items-center justify-center bg-stone-100 dark:bg-stone-900/50 group-hover:bg-[#a89968] dark:group-hover:bg-[#d4af37] mb-6 shadow-inner border border-stone-200 dark:border-white/5 transition-all duration-500 group-hover:scale-110">`;

app = app.replace(search, replace);
app = app.replace(search, replace); // Card 2

// Their closing tags
app = app.replace(/authentic dialogue.'\}\r?\n              <\/p>\r?\n            <\/div>/, "authentic dialogue.'}\n              </p>\n            </GlowingCard>");
app = app.replace(/feels right for you\.\r?\n              <\/p>\r?\n            <\/div>/, "feels right for you.\n              </p>\n            </GlowingCard>");

// Replace the 3 Resource Cards
let resSearch = `<div className="glass-card hover-lift p-10 md:p-12 flex flex-col items-center text-center h-full group relative overflow-hidden">
              <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-transparent via-[#a89968] dark:via-[#d4af37] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <div className="icon-wrapper">`;

let resReplace = `<GlowingCard className="glass-card hover-lift p-10 md:p-12 flex flex-col items-center text-center h-full">
              <div className="icon-wrapper">`;

app = app.replace(resSearch, resReplace);
app = app.replace(resSearch, resReplace);
app = app.replace(resSearch, resReplace);

// Their closing tags
app = app.replace(/and well-being\.\r?\n              <\/p>\r?\n              <button className="button-secondary text-xs md:text-sm cursor-default">Coming Soon<\/button>\r?\n            <\/div>/, 'and well-being.\n              </p>\n              <button className="button-secondary text-xs md:text-sm cursor-default">Coming Soon</button>\n            </GlowingCard>');

app = app.replace(/healing and presence\.\r?\n              <\/p>\r?\n              <button className="button-secondary text-xs md:text-sm cursor-default">Coming Soon<\/button>\r?\n            <\/div>/, 'healing and presence.\n              </p>\n              <button className="button-secondary text-xs md:text-sm cursor-default">Coming Soon</button>\n            </GlowingCard>');

app = app.replace(/independent study\.\r?\n              <\/p>\r?\n              <button className="button-secondary text-xs md:text-sm cursor-default">Coming Soon<\/button>\r?\n            <\/div>/, 'independent study.\n              </p>\n              <button className="button-secondary text-xs md:text-sm cursor-default">Coming Soon</button>\n            </GlowingCard>');

// Replace FAQ with Animated Accordion
const oldFaqMap = /\{faqData\.map\(\(item, index\) => \([\s\S]*?\)\)\}/;
const newFaqMap = `{faqData.map((item, index) => (
              <AnimatedAccordion 
                key={index}
                title={item.question}
                darkMode={darkMode}
                isOpen={expandedFaq === index}
                onToggle={() => toggleFaq(index)}
              >
                {item.answer}
              </AnimatedAccordion>
            ))}`;

app = app.replace(oldFaqMap, newFaqMap);

fs.writeFileSync(appPath, app, 'utf8');
console.log("Finished script!");
