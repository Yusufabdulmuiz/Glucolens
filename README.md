# Glucolens

![Project Status](https://img.shields.io/badge/Status-Active_Development-blue)
![Version](https://img.shields.io/badge/Version-1.0.0-green)
![License](https://img.shields.io/badge/License-Proprietary-red)

**A Fault-Tolerant Multimodal Medical ML System for Diabetic Risk Prediction.**

Glucolens is a health-tech platform designed to predict Type 2 Diabetes risk using a multimodal approach. It combines anthropometric data, lifestyle indicators, skin sign analysis (Acanthosis Nigricans), and genomic data to provide explainable risk assessments.

---

## 📂 Repository Structure

This project follows a monorepo structure separating the client-side application from the server-side logic.

```text
glucolens/
├── frontend/           # React + Vite application (The User Interface)
├── backend/            # API & ML Model Services (The Logic)
└── README.md           # This file