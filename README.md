<p align="center">
  <img width="1920" height="925" alt="image" src="https://github.com/user-attachments/assets/e92cc0eb-7204-404f-941e-661c724a4cd1" />

</p>

# 🔐 CipherStack

> A modern, node-based encryption pipeline web app built with React, Vite, Zustand, and Tailwind CSS. Experiment with classic ciphers, chain them, and visualize the process—all in a beautiful, mobile-responsive UI.

---

## 🚀 Features

✨ **Node-based pipeline:** Drag, drop, and reorder cipher nodes to create custom encryption flows.

🔑 **Classic ciphers:** Includes Caesar, XOR, Vigenère, Base64, Reverse, Rail Fence, and more.

⚡ **Live input/output:** Instantly see results as you type or modify the pipeline.

💾 **Export/Import:** Save and load your pipeline configurations as JSON.

📱 **Mobile responsive:** Pixel-perfect design for both desktop and mobile, with a toggleable sidebar and accessible controls.

🎨 **Beautiful UI:** Clean, modern, and intuitive interface powered by Tailwind CSS.

---

## 📱 Mobile Experience

- Sidebar is toggleable and overlays content on mobile.
- Top bar actions (Encrypt/Decrypt, Export, Import, Clear) are always accessible via a dropdown.
- Input and output panels are stacked vertically for easy use on small screens.

---

## 🛠️ Tech Stack

- [React](https://react.dev/) + [Vite](https://vitejs.dev/)
- [Zustand](https://zustand-demo.pmnd.rs/) for state management
- [Tailwind CSS](https://tailwindcss.com/) for styling
- [@dnd-kit](https://dndkit.com/) for drag-and-drop

---

## 📦 Getting Started

```bash
# 1. Clone the repo
git clone https://github.com/your-username/cipherstack.git
cd cipherstack

# 2. Install dependencies
npm install

# 3. Start the development server
npm run dev

# 4. Open http://localhost:5173 in your browser
```

---

## 🌐 Deployment

This project is ready for [Vercel](https://vercel.com/) deployment. All necessary configuration files are included.

```bash
# Deploy to Vercel (if Vercel CLI is installed)
vercel --prod
```

---

## 📝 Customization

- Add new ciphers in `src/ciphers/` and register them in `src/ciphers/index.ts`.
- Tweak the UI in `src/components/` and styles in `src/index.css`.
- Adjust Tailwind config in `tailwind.config.js`.

---

## 🤝 Contributing

Pull requests are welcome! For major changes, please open an issue first to discuss what you would like to change.

---

## 📄 License

MIT License. See [LICENSE](LICENSE) for details.

---

## 💡 Inspiration

CipherStack was inspired by the need for a hands-on, visual way to learn and experiment with classic cryptography techniques.

---

<p align="center">
  <em>Made with ❤️ by Usman</em>
</p>
