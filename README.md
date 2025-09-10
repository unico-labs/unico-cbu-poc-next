<p align="center">
  <img src="src/app/assets/logo-home.svg" alt="Unico Logo" width="300"/>
</p>

# Unico SDK - Next.js PoC

A comprehensive proof of concept demonstrating the Unico SDK integration with multiple testing modes in Next.js.

## 🚀 Quick Start

```bash
npm install
npm run dev
```

The application will be available at `http://localhost:4200`

## 📱 Testing Modes

The application provides **4 different testing modes** to explore the Unico SDK integration:

### 🏠 Home Screen
- Main navigation interface
- Select between different testing modes
- Access to official documentation

### 🪟 Modal Test
- SDK displayed in an overlay modal
- Clean modal interface with backdrop blur
- Automatic closure when flow completes

### 🖼️ Iframe Box Test  
- SDK embedded directly in a container on the page
- Manual controls: Initialize, Open, and Close
- Fixed container with proper dimensions

### 📺 Fullscreen Test
- SDK taking up the entire browser screen
- Immersive fullscreen experience
- Automatic return when flow finishes

## 🔧 How to Use

1. **Get your credentials**: You need a **Token** and **Transaction ID** from your Unico service account
2. **Choose a testing mode**: Navigate from the home screen to your preferred test mode
3. **Fill the required fields**: Enter your Token and Transaction ID
4. **Initialize the SDK**: Click "Initialize SDK" (if available)
5. **Start the flow**: Click the respective "Open" button to begin the Unico flow

## 📚 Requirements

- Node.js 18+
- Valid Unico service account
- Authorized domain for iframe integration

## 🎯 Features

- ✅ **Next.js 15** with App Router
- ✅ **Responsive Design** (Mobile, Tablet, Desktop)
- ✅ **Dynamic SDK Loading** for optimal performance
- ✅ **Modern UI** with Unico branding
- ✅ **Multiple Integration Modes**

## 📖 Documentation

For detailed SDK implementation guide, visit: [Unico Developer Center](https://devcenter.unico.io/idcloud/integracao/integracao-by-unico/controlando-a-experiencia/sdk#como-comecar)

---

**SDK Version**: 2.1.2 | **Next.js Version**: 15.3.3