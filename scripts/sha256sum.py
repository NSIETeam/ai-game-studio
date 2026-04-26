import hashlib
import pathlib
import sys

p = pathlib.Path(sys.argv[1]).resolve()
out = pathlib.Path(sys.argv[2]).resolve()

h = hashlib.sha256(p.read_bytes()).hexdigest().upper()
out.write_text(f"{h}  {p.name}\n", encoding="ascii")
print(h)
