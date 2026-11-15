"""Concatenate src/ into one self-contained dist/index.html."""
from pathlib import Path

root = Path(__file__).parent
src = root / "src"
tpl = (src / "template.html").read_text()
style = (src / "style.css").read_text()
script = "\n".join((src / f).read_text() for f in ["story.js", "art.js", "interactions.js"])
script += "\ndocument.getElementById('globalDefs').innerHTML = DEFS;\n"
script += (src / "engine.js").read_text()
html = tpl.replace("/*STYLE*/", style).replace("/*SCRIPT*/", script)
out = root / "index.html"
out.write_text(html)
print(f"built {out} ({len(html)/1024:.0f} KB)")
