from pathlib import Path
import html
import re

INPUT_TXT = "log.txt"
OUTPUT_HTML = "record-2026-01-15.html"

DATE = "2026-01-15"
AI_NAME = "ChatGPT 5.2"
REF_CLASSIC = "（必要になったら後で記入）"
CONTEXT = "この場が生まれた記録"

template = """<!doctype html>
<html lang="ja">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>記録 {date}</title>
  <style>
    :root{{ --text:#111; --muted:rgba(0,0,0,.55); --bg:#fff; --rule:rgba(0,0,0,.10); }}
    html,body{{ background:var(--bg); color:var(--text); margin:0; }}
    body{{ font-family: ui-serif,"Hiragino Mincho ProN","Yu Mincho","Noto Serif JP",serif; line-height:1.9; letter-spacing:.01em; }}
    main{{ max-width:860px; margin:0 auto; padding:64px 24px 96px; }}
    .date{{ font-size:18px; margin:0 0 18px; }}
    .section-title{{ font-size:14px; color:var(--muted); margin:28px 0 10px; }}
    ul.meta{{ margin:0; padding-left:1.2em; }}
    ul.meta li{{ margin:2px 0; }}
    hr{{ border:none; border-top:1px solid var(--rule); margin:28px 0; }}
    .log{{ white-space:pre-wrap; word-break:break-word; margin:0; font-size:16px; }}
    .speaker{{ font-weight:700; color:var(--muted); }}
    a.back{{ display:inline-block; margin-top:42px; color:var(--muted); text-decoration:none; }}
    a.back:hover{{ text-decoration:underline; }}
  </style>
</head>
<body>
  <main>
    <div class="date">{date}</div>
    <div class="section-title">生成条件</div>
    <ul class="meta">
      <li>参照古典： {ref}</li>
      <li>AI： {ai}</li>
      <li>対話状況： {ctx}</li>
    </ul>
    <hr />
    <div class="section-title">記録</div>
    <div class="log">
{body}
    </div>
    <a class="back" href="./index.html">戻る</a>
  </main>
</body>
</html>
"""

raw = Path(INPUT_TXT).read_text(encoding="utf-8")

def render(text: str) -> str:
    lines = text.splitlines()
    out = []
    pat = re.compile(r"^(あなた|ChatGPT 5\.2)：")
    for line in lines:
        m = pat.match(line)
        if m:
            speaker = m.group(1)
            rest = line[len(speaker)+1:]
            out.append(f'<span class="speaker">{html.escape(speaker)}：</span>{html.escape(rest)}')
        else:
            out.append(html.escape(line))
    return "\n".join(out)

body = render(raw)

html_out = template.format(
    date=DATE,
    ai=AI_NAME,
    ref=html.escape(REF_CLASSIC),
    ctx=html.escape(CONTEXT),
    body=body
)

Path(OUTPUT_HTML).write_text(html_out, encoding="utf-8")
print("Wrote", OUTPUT_HTML)
