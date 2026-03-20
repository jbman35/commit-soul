# 🧠 Commit Personality Analyzer

> What do your commits say about you?

Analyze your Git history and discover your **developer personality**.

---

## ✨ Features

* 🔍 Analyze commit history
* 👤 Filter by author (`--author`)
* 🧬 Detect your dev personality
* 📊 Fun and insightful stats
* ⚡ Built with Bun (fast af)

---

## 🚀 Example

```bash
bun run src/cli.ts
bun run src/cli.ts ./my-repo
bun run src/cli.ts ./my-repo --author="John Doe"
bun run src/cli.ts --author=john@email.com
```

```text
🧠 Personality: The Night Owl 🌙

"Your best code is written when the world sleeps."

📊 Stats:
- Total commits: 542
- Fix ratio: 28%
- Late night commits: 46%
- Avg message length: 32 chars
```

---

## 🧬 Personalities

* 🔥 Firefighter
* 🧱 Architect
* 🧹 Janitor
* 🎯 Sniper
* 🌙 Night Owl
* 🔀 Integrator
* 📏 Perfectionist
* 🤖 Conventional Dev
* 🧪 Mad Scientist
* 🐢 Slow Burner
* 🎲 Chaos Coder
* 🧘 Zen Dev

---

## ⚙️ Usage

```bash
bun run src/cli.ts [path] [--author="name|email"]
```

* `path` *(optional)*: path to the git repository (default: current directory)
* `--author` *(optional)*: filter commits by author name or email

---

## 💡 Philosophy

This project is not about being accurate.

It's about being:

* fun
* insightful
* slightly too honest

---

## 🤝 Contributing

PRs welcome.

Add your own personality 😈

---

## ⭐ Star this repo

If it roasted you correctly.
