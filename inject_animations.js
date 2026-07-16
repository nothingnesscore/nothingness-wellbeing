const fs = require('fs');
const path = require('path');

const appPath = path.join(__dirname, 'src', 'App.jsx');
let app = fs.readFileSync(appPath, 'utf8');

// 1. Add Imports
const importsToAdd = `
import { AnimatedAccordion } from './components/animations/AnimatedAccordion';
import { GlowingCard } from './components/animations/GlowingCard';
import { TabBar } from './components/animations/TabBar';
import { MorphingTextAnimation } from './components/animations/MorphingText';
`;
app = app.replace("import LiquidZenScene from './components/LiquidZenScene';", "import LiquidZenScene from './components/LiquidZenScene';\n" + importsToAdd);

// 2. Add activeTab state
app = app.replace("const [expandedFaq, setExpandedFaq] = useState(null);", "const [expandedFaq, setExpandedFaq] = useState(null);\n  const [activeTab, setActiveTab] = useState('counselling');");

// 3. Tab Bar
const oldNavBarLinks = `<div className={\`flex gap-8 transition-all duration-300 \${scrolled ? 'text-xs' : 'text-sm'}\`}>
              <a href="#counselling" className={\`\${darkMode ? 'text-slate-300 hover:text-slate-50' : 'text-stone-600 dark:text-slate-300 group-hover:text-white dark:group-hover:text-[#050505] hover:text-stone-900 dark:text-slate-50'} transition\`}>Counselling</a>
              <a href="#tutoring" className={\`\${darkMode ? 'text-slate-300 hover:text-slate-50' : 'text-stone-600 dark:text-slate-300 group-hover:text-white dark:group-hover:text-[#050505] hover:text-stone-900 dark:text-slate-50'} transition\`}>Psychology Tutoring</a>
              <a href="#resources" className={\`\${darkMode ? 'text-slate-300 hover:text-slate-50' : 'text-stone-600 dark:text-slate-300 group-hover:text-white dark:group-hover:text-[#050505] hover:text-stone-900 dark:text-slate-50'} transition\`}>Resources</a>
            </div>`;
const newTabBar = `<TabBar 
              tabs={[
                { id: 'counselling', label: 'Counselling' },
                { id: 'tutoring', label: 'Psychology Tutoring' },
                { id: 'resources', label: 'Resources' }
              ]}
              activeTab={activeTab}
              onTabClick={(id) => {
                setActiveTab(id);
                document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
              }}
              darkMode={darkMode}
              scrolled={scrolled}
            />`;
app = app.replace(oldNavBarLinks, newTabBar);

// 4. Morphing Text
const oldHeroText = `<h1 className="text-5xl md:text-7xl font-bold mb-6 tracking-tight fade-in">\n            Person-Centred<br />Counselling\n          </h1>`;
const newMorphingText = `<h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 tracking-tight fade-in h-[3em] md:h-[2.5em] flex items-center justify-center md:justify-start">
            <MorphingTextAnimation texts={[
              "Person-Centred\\nCounselling.",
              "Psychology\\nTutoring.",
              "A Safe Space\\nTo Heal.",
              "Guidance &\\nLearning."
            ]} />
          </h1>`;
app = app.replace(oldHeroText, newMorphingText);

// 5. Glowing Cards (Counselling section has 2, Resources has 3)
// We will replace `<div className="glass-card hover-lift p-10 md:p-12 flex flex-col items-center text-center h-full group relative overflow-hidden">`
const oldCardStr = `<div className="glass-card hover-lift p-10 md:p-12 flex flex-col items-center text-center h-full group relative overflow-hidden">`;
const newCardStr = `<GlowingCard className="glass-card hover-lift p-10 md:p-12 flex flex-col items-center text-center h-full">`;
app = app.replace(new RegExp(oldCardStr.replace(/[.*+?^\${}()|[\]\\]/g, '\\$&'), 'g'), newCardStr);

// Now we need to close the glowing card. The original div was closed with `</div>`.
// Since we have multiple divs, we need to be careful. I'll just manually replace the closing tags for these specific sections.
// Wait, regex might fail if there are nested divs. 
// A safer approach: I will use a custom script to inject GlowingCard in App.jsx.

// Let's actually replace the start AND end using a more targeted approach.
// For the 2 Counselling Cards:
app = app.replace(/<GlowingCard className="glass-card hover-lift p-10 md:p-12 flex flex-col items-center text-center h-full">([\s\S]*?)<div className="w-16 h-16 rounded-full/g, '<GlowingCard className="glass-card hover-lift p-10 md:p-12 flex flex-col items-center text-center h-full">\n              <div className="w-16 h-16 rounded-full');

// But how to close them? They end right before the next card or the end of the grid.
// In the counselling grid:
// </div> // end card 1
// <GlowingCard // start card 2
app = app.replace(/<\/p>\n            <\/div>\n\n            <GlowingCard/g, '</p>\n            </GlowingCard>\n\n            <GlowingCard');
// And the end of card 2:
app = app.replace(/<\/p>\n            <\/div>\n          <\/div>\n\n          \{\/\* Counselling Features \*\/\}/g, '</p>\n            </GlowingCard>\n          </div>\n\n          {/* Counselling Features */}');

// In the resources grid:
// end card 1
app = app.replace(/<\/button>\n            <\/div>\n\n            <GlowingCard/g, '</button>\n            </GlowingCard>\n\n            <GlowingCard');
// end of the last resource card:
app = app.replace(/<\/button>\n            <\/div>\n          <\/div>\n        <\/section>\n\n        <div className="section-divider"><\/div>\n\n        \{\/\* FAQ SECTION \*\/\}/g, '</button>\n            </GlowingCard>\n          </div>\n        </section>\n\n        <div className="section-divider"></div>\n\n        {/* FAQ SECTION */}');


// 6. Animated Accordion
const oldFaqMap = `{faqData.map((item, index) => (
              <div 
                key={index} 
                className="glass-card rounded-2xl overflow-hidden cursor-pointer"
                onClick={() => toggleFaq(index)}
              >
                <div className="p-5 md:p-6 flex justify-between items-center gap-4">
                  <h4 className={\`text-base md:text-lg font-medium \${darkMode ? 'text-slate-50' : 'text-stone-900 dark:text-slate-50'}\`}>{item.question}</h4>
                  <div className={\`transition-transform duration-300 flex-shrink-0 \${expandedFaq === index ? 'rotate-180' : ''}\`}>
                    <ChevronDown className={\`w-5 h-5 \${darkMode ? 'text-slate-400' : 'text-stone-500 dark:text-slate-400'}\`} />
                  </div>
                </div>
                <div className={\`faq-answer \${expandedFaq === index ? 'open' : ''}\`}>
                  <div className="faq-answer-inner">
                    <div className="px-5 md:px-6 pb-6 pt-0">
                      <div className="w-full h-px bg-stone-200 dark:bg-white/10 mb-4"></div>
                      <p className={\`text-sm md:text-base leading-relaxed \${darkMode ? 'text-slate-300' : 'text-stone-600 dark:text-slate-300 group-hover:text-white dark:group-hover:text-[#050505]'}\`}>
                        {item.answer}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ))}`;

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

// Wait, the strings might not perfectly match due to whitespace.
// I will just use regex to replace the whole map block.
app = app.replace(/\{faqData\.map\(\(item, index\) => \([\s\S]*?\)\)\}/, newFaqMap);

fs.writeFileSync(appPath, app, 'utf8');
console.log("App.jsx updated with animations successfully.");
