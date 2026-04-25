---
name: ai-finance-legion
description: "AI Finance Legion — 6-Agent financial pipeline. Input your bills/statements, get professional-grade financial analysis, tax advice, investment suggestions, and risk audit."
author: "NSIETeam"
version: "1.0.0"
trigger: |
  Keywords: finance, financial analysis, tax, investment, accounting, billing, audit, risk control, budget, money, personal finance, 财务, 理财, 会计, 税务, 投资, 审计, 风控, 报表
  When user says: "帮我管钱", "分析我的账单", "做财务审计", "我的财务状况", "帮我记账", "投资建议"
tools:
  - sessions_spawn
  - write
  - exec
  - read
  - neodata-financial-search
  - multi-search-engine
---

# AI Finance Legion — 6-Agent Financial Pipeline

## 🎯 What is this?

**AI Finance Legion** is a **6-Agent financial intelligence pipeline** for OpenClaw. 
Give it your bills, bank statements, or raw financial data, and 6 specialized AI agents work in sequence to deliver a comprehensive financial analysis — from accounting to investment to tax to risk control.

## 🤖 The Six Agents

| # | Agent | Role |
|---|-------|------|
| 1 | 📊 **Finance Auditor** | Cleans & classifies transaction data, flags anomalies |
| 2 | 📈 **Financial Analyst** | Generates P&L, balance sheet, cash flow, key ratios |
| 3 | 💡 **Investment Advisor** | Real-time market research + personalized portfolio |
| 4 | ⚖️ **Tax Officer** | Tax calculation, invoice compliance, optimization |
| 5 | 🛡️ **Risk Controller** | Fraud detection, compliance audit, stress test |
| 6 | 🤖 **CFO** | Aggregates everything → executive summary + action plan |

## 🚀 How It Works

```
User Data → Auditor → Analyst → [Advisor ║ TaxOfficer] → RiskController → CFO → Final Report
```

Two parallel execution lanes at Step 3 (Investment + Tax).

## 🧰 Real API Integration

- **neodata-financial-search**: Stock quotes, fund data, macro indicators, industry analysis
- **multi-search-engine**: Industry cost benchmarks, policy changes, market trends
