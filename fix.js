const fs = require('fs');

const appPath = 'd:\\AI_Workspace\\Nothingness_WellBeing\\nothingness-wellbeing\\src\\App.jsx';
let content = fs.readFileSync(appPath, 'utf8');

const lines = content.split('\n');
const newLines = [];
let skipNext = false;

for (let i = 0; i < lines.length; i++) {
    if (skipNext) {
        skipNext = false;
        continue;
    }
    
    if (lines[i].includes('className="glass-card hover-lift p-10 md:p-12 flex flex-col items-center text-center h-full group relative overflow-hidden"')) {
        newLines.push(lines[i].replace('<div className="glass-card hover-lift p-10 md:p-12 flex flex-col items-center text-center h-full group relative overflow-hidden">', '<GlowingCard className="glass-card hover-lift p-10 md:p-12 flex flex-col items-center text-center h-full">'));
        skipNext = true; // skip the next line which is the gradient
    } else {
        newLines.push(lines[i]);
    }
}

fs.writeFileSync(appPath, newLines.join('\n'), 'utf8');
console.log("Fixed!");
