const fs = require('fs');
const path = require('path');

const appPath = path.join(__dirname, 'src', 'App.jsx');
let app = fs.readFileSync(appPath, 'utf8');

// The file currently has `<GlowingCard ...` and later `</div>` instead of `</GlowingCard>`.
// I will just split the file by lines and look for `<GlowingCard`
// then find the corresponding `</div>` that closes it.
// Actually, since I know exactly where they are, I can replace them by context.
app = app.replace("authentic dialogue.'}\n              </p>\n            </div>", "authentic dialogue.'}\n              </p>\n            </GlowingCard>");
app = app.replace("feels right for you.\n              </p>\n            </div>", "feels right for you.\n              </p>\n            </GlowingCard>");

app = app.replace("and well-being.\n              </p>\n              <button className=\"button-secondary text-xs md:text-sm cursor-default\">Coming Soon</button>\n            </div>", "and well-being.\n              </p>\n              <button className=\"button-secondary text-xs md:text-sm cursor-default\">Coming Soon</button>\n            </GlowingCard>");

app = app.replace("healing and presence.\n              </p>\n              <button className=\"button-secondary text-xs md:text-sm cursor-default\">Coming Soon</button>\n            </div>", "healing and presence.\n              </p>\n              <button className=\"button-secondary text-xs md:text-sm cursor-default\">Coming Soon</button>\n            </GlowingCard>");

app = app.replace("independent study.\n              </p>\n              <button className=\"button-secondary text-xs md:text-sm cursor-default\">Coming Soon</button>\n            </div>", "independent study.\n              </p>\n              <button className=\"button-secondary text-xs md:text-sm cursor-default\">Coming Soon</button>\n            </GlowingCard>");

fs.writeFileSync(appPath, app, 'utf8');
console.log("Syntax fixed!");
