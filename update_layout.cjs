const fs = require('fs');
let code = fs.readFileSync('src/components/Layout.tsx', 'utf8');

const newBlock = `              ) : (
                <Tooltip content="System Login" position="bottom">
                  <button className="flex items-center gap-3 group cursor-pointer w-full text-left" aria-label="Log into system" onClick={loginWithGoogle}>
                    <div className="text-right hidden md:block">
                      <p className="text-xs tracking-widest text-zinc-400 font-bold uppercase group-hover:text-[#FF69B4] transition-colors">Log In</p>
                      <p className="text-[10px] uppercase tracking-[0.3em] text-zinc-600 mt-1">
                        System Status: Offline
                      </p>
                    </div>
                    <div className="w-10 h-10 shrink-0 rounded-full border border-zinc-800 border-dashed flex items-center justify-center text-zinc-600 group-hover:border-[#FF69B4] group-hover:text-[#FF69B4] transition-all bg-zinc-900/50">
                       <span className="text-xs tracking-widest font-black uppercase">?</span>
                    </div>
                  </button>
                </Tooltip>
              )}`;

// This regex finds the broken block and replaces it
code = code.replace(/              \) : \([\s\S]*?              \)}/, newBlock);
fs.writeFileSync('src/components/Layout.tsx', code);
