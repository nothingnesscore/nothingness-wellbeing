import os

app_path = r'd:\AI_Workspace\Nothingness_WellBeing\nothingness-wellbeing\src\App.jsx'

with open(app_path, 'r', encoding='utf-8') as f:
    content = f.read()

lines = content.split('\n')
new_lines = []

skip_next = False
for i, line in enumerate(lines):
    if skip_next:
        skip_next = False
        continue
    
    if 'className="glass-card hover-lift p-10 md:p-12 flex flex-col items-center text-center h-full group relative overflow-hidden"' in line:
        new_lines.append(line.replace('<div className="glass-card hover-lift p-10 md:p-12 flex flex-col items-center text-center h-full group relative overflow-hidden">', '<GlowingCard className="glass-card hover-lift p-10 md:p-12 flex flex-col items-center text-center h-full">'))
        skip_next = True # skip the next line which is the gradient
    else:
        new_lines.append(line)

with open(app_path, 'w', encoding='utf-8') as f:
    f.write('\n'.join(new_lines))

print("Fixed!")
