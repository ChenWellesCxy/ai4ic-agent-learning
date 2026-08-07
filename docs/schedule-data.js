window.AI4IC_DATA = {
  "generatedFrom": "AI4IC_Agent_8Week_Study_Schedule.xlsx",
  "title": "Welles — AI for IC Design & Verification 8 周全职学习计划",
  "subtitle": "定位：AI 硕士 + DRAM 全定制验证 → EDA / Verification Agent Engineer。主线是 Agent engineering + deterministic EDA tools + verification/debug context；最终用两个项目证明能力。",
  "dateRange": "2026-08-10 → 2026-10-02",
  "environment": "建议环境：Linux / WSL2；Python 3.11 + uv + Git；支持 tool calling 的模型 API（或本地模型）；Verilator/Icarus + cocotb；Yosys/SymbiYosys；ngspice。OpenROAD 为可选扩展，不进入 8 周核心路径。",
  "roadmap": [
    {
      "week": "W1",
      "dates": "08/10–08/14",
      "focus": "Agent 底座 + Context",
      "book": "Ch1–2",
      "model": "Transformer inference / KV cache",
      "verification": "最小 verification loop",
      "deliverable": "Verification Agent v0",
      "plannedHours": 40
    },
    {
      "week": "W2",
      "dates": "08/17–08/21",
      "focus": "RAG + MCP + Tools",
      "book": "Ch3–4",
      "model": "Embedding / retrieval",
      "verification": "EDA MCP tools + structured index",
      "deliverable": "MCP Verification Agent v0.2",
      "plannedHours": 40
    },
    {
      "week": "W3",
      "dates": "08/24–08/28",
      "focus": "Coding Agent + Digital DV",
      "book": "Ch5",
      "model": "Tool-use / structured generation",
      "verification": "SV / SVA / Formal / cocotb / UVM mental model",
      "deliverable": "Project A skeleton",
      "plannedHours": 40
    },
    {
      "week": "W4",
      "dates": "08/31–09/04",
      "focus": "Closed-loop Verification",
      "book": "Ch5 回访",
      "model": "Reasoning + external verifier",
      "verification": "Spec→vPlan→SVA/TB→Sim/Formal→RCA",
      "deliverable": "Project A v1",
      "plannedHours": 40
    },
    {
      "week": "W5",
      "dates": "09/07–09/11",
      "focus": "Context + Waveform Debug",
      "book": "Ch2 回访",
      "model": "Long context / compression",
      "verification": "VCD query / pass-fail compare / triage",
      "deliverable": "Waveform Debug Agent v0",
      "plannedHours": 40
    },
    {
      "week": "W6",
      "dates": "09/14–09/18",
      "focus": "Agent Eval",
      "book": "Ch6",
      "model": "Eval / statistics / ablation",
      "verification": "Mutation benchmark / RCA metrics",
      "deliverable": "Project A v2 + ≥30-case benchmark",
      "plannedHours": 40
    },
    {
      "week": "W7",
      "dates": "09/21–09/25",
      "focus": "Full-custom / Memory Agent",
      "book": "—",
      "model": "模型暂停，专注 domain/tool",
      "verification": "ngspice / analog waveform / hypothesis-rerun",
      "deliverable": "Project B v0",
      "plannedHours": 40
    },
    {
      "week": "W8",
      "dates": "09/28–10/02",
      "focus": "Production + Portfolio",
      "book": "Ch7 + Ch8/10 选读",
      "model": "SFT/RL decision + vLLM serving",
      "verification": "Reliability / audit / HITL / demo",
      "deliverable": "Project A+B v1.0 + 90-day plan",
      "plannedHours": 40
    }
  ],
  "dailyBlocks": [
    {
      "time": "09:00–11:00",
      "hours": 2,
      "use": "主教材 / 理论",
      "rule": "只学当天会用到的概念"
    },
    {
      "time": "11:00–12:00",
      "hours": 1,
      "use": "小实验 / 练习",
      "rule": "当天概念必须至少跑一次"
    },
    {
      "time": "13:30–17:30",
      "hours": 4,
      "use": "AI4IC 项目实战",
      "rule": "连续深度工作；当天产出可验收"
    },
    {
      "time": "19:30–20:30",
      "hours": 1,
      "use": "复盘 / 论文 / Eval",
      "rule": "记录 evidence、失败原因和次日入口"
    }
  ],
  "rules": [
    "① ≥60% 时间动手；读书服务于当天项目，不追求刷完 95 个实验。",
    "② 每周五必须有可运行 deliverable；失败案例也进入 benchmark。",
    "③ LLM 负责计划/推理；simulation / formal / waveform measurement 负责判真。",
    "④ 周六最多 2–3h 补欠/整理；周日休息。落后就顺延，不透支下一周。",
    "⑤ 所有作品只用公开/自建数据与电路；绝不搬公司 IP、PDK、spec、log、netlist、waveform。"
  ],
  "daily": [
    {
      "date": "2026-08-10",
      "week": "W1",
      "day": "D1",
      "topic": "Agent 底座与学习环境",
      "theory": "ai-agent-book Ch1：Agent = LLM + Context + Tools；理解 harness。模型快速复习：tokenizer、attention、causal LM。",
      "lab": "跑 Ch1 中 1–2 个最小实验；画出一次完整 tool-call trace。",
      "project": "不用框架手写最小 Agent Loop：model → choose_tool → execute → result → next step；先做 read_file / calculator 等安全工具。",
      "review": "整理 1 页笔记：Agent / workflow / coding agent 的边界；记录今天最容易踩的 3 个坑。",
      "deliverable": "agent_loop.py + 一份可读的 tool trace；能解释每轮上下文里到底放了什么。",
      "book": "Ch1",
      "resourceIds": [
        "R01",
        "R02",
        "R18"
      ],
      "plannedHours": 8,
      "actualHours": null,
      "status": "未开始",
      "notes": ""
    },
    {
      "date": "2026-08-11",
      "week": "W1",
      "day": "D2",
      "topic": "Context 生命周期",
      "theory": "Ch2：system/user/tool message、上下文窗口、prompt/skills。模型：prefill、decode、KV cache 与延迟/成本。",
      "lab": "给 agent 加 token/context 记录；观察长 prompt 对时延和上下文长度的影响。",
      "project": "用合成 EDA regression log 做 naive 全量 / 截断 / 结构化压缩三种输入，对比信息保真与 token 数。",
      "review": "写下“什么必须留在上下文、什么应该做成 tool”的判断规则。",
      "deliverable": "context_trace.json + 三种 context 策略对比表；至少 5 个固定问题不丢关键证据。",
      "book": "Ch2",
      "resourceIds": [
        "R01",
        "R18"
      ],
      "plannedHours": 8,
      "actualHours": null,
      "status": "未开始",
      "notes": ""
    },
    {
      "date": "2026-08-12",
      "week": "W1",
      "day": "D3",
      "topic": "Context 压缩与证据链",
      "theory": "Ch2：context compression、skills、上下文选择；重点理解“摘要不能破坏可追溯证据”。",
      "lab": "定义 evidence schema：source / location / timestamp / signal / claim。",
      "project": "实现 compress_log()：保留 failing test、first error、关键 warning、上下文行和原始位置；写 10 个单测。",
      "review": "回看 2 个压缩失败例子，记录丢失证据的具体原因。",
      "deliverable": "compress_log() + tests；任何 RCA claim 都能指回原始 log 位置。",
      "book": "Ch2",
      "resourceIds": [
        "R01"
      ],
      "plannedHours": 8,
      "actualHours": null,
      "status": "未开始",
      "notes": ""
    },
    {
      "date": "2026-08-13",
      "week": "W1",
      "day": "D4",
      "topic": "EDA Context Schema",
      "theory": "学习 context routing：Spec、hierarchy、RTL、log、waveform、tool history 应该分层，而不是拼成一个 prompt。",
      "lab": "给一个小 FIFO 建 context packet：requirement / module / failing test / evidence / tool state。",
      "project": "实现 build_context(failure, budget)：按预算挑选最相关证据；用 5 个故障案例比较 full-context 与 targeted-context。",
      "review": "写 context schema v1 和 3 条“何时追加信息”的触发条件。",
      "deliverable": "context_schema.json + 5-case 对比；targeted-context 不降低关键事实命中率。",
      "book": "Ch2",
      "resourceIds": [
        "R01"
      ],
      "plannedHours": 8,
      "actualHours": null,
      "status": "未开始",
      "notes": ""
    },
    {
      "date": "2026-08-14",
      "week": "W1",
      "day": "D5",
      "topic": "Verification Agent v0",
      "theory": "复盘 Ch1–2；把 Agent 看成有状态的验证闭环，而不是聊天机器人。",
      "lab": "准备一个带故障的 counter/FIFO 与固定 test；明确 golden 输出。",
      "project": "给 Agent 暴露 compile_verilog / run_simulation / read_source / read_log / query_vcd 五类工具，跑通一次 fail → evidence → RCA。",
      "review": "周复盘：哪些判断来自模型，哪些判断来自 deterministic tool？列出下周要标准化的 tool schema。",
      "deliverable": "Verification Agent v0 demo + README；1 个案例可重复跑通且 RCA 有证据。",
      "book": "Ch1–2",
      "resourceIds": [
        "R01",
        "R05",
        "R06"
      ],
      "plannedHours": 8,
      "actualHours": null,
      "status": "未开始",
      "notes": ""
    },
    {
      "date": "2026-08-17",
      "week": "W2",
      "day": "D6",
      "topic": "RAG / Memory 基础",
      "theory": "Ch3：dense / sparse / hybrid retrieval、memory 与 knowledge base；模型补充 embedding、reranker、metadata filtering。",
      "lab": "用公开说明 + 自造 bug history 建 20–50 条小语料；设计 20 个查询和 gold doc。",
      "project": "实现最小 hybrid retrieval（BM25/关键词 + embedding 可二选一组合），计算 Recall@k；不要先上复杂向量数据库。",
      "review": "记录 5 个 retrieval miss，区分 chunking、query、metadata、embedding 哪一层出问题。",
      "deliverable": "retrieval_eval.csv；20 queries 的 gold / top-k 可审计。",
      "book": "Ch3",
      "resourceIds": [
        "R01"
      ],
      "plannedHours": 8,
      "actualHours": null,
      "status": "未开始",
      "notes": ""
    },
    {
      "date": "2026-08-18",
      "week": "W2",
      "day": "D7",
      "topic": "Structured EDA Retrieval",
      "theory": "学习为什么 hierarchy / AST / connectivity / requirement ID 往往比纯 embedding 更适合 EDA context。",
      "lab": "用 Yosys 输出的小型 RTL 结构信息或自写 parser，抽取 module / instance / signal relation。",
      "project": "实现 get_driver / get_fanout / get_module_path / get_requirement 四个结构化查询；和文本检索组合。",
      "review": "画一张“查询 → 结构化索引/文本索引 → evidence”的路由图。",
      "deliverable": "structured_index.json + 4 个查询 API + 10 个单测。",
      "book": "Ch3",
      "resourceIds": [
        "R13",
        "R14"
      ],
      "plannedHours": 8,
      "actualHours": null,
      "status": "未开始",
      "notes": ""
    },
    {
      "date": "2026-08-19",
      "week": "W2",
      "day": "D8",
      "topic": "MCP Fundamentals",
      "theory": "Ch4 + MCP 2026-07-28 文档：client/server、tools/resources/prompts、schema 与 discovery。",
      "lab": "做一个 hello MCP server/client，亲手看 tools/list 与 tool call 的输入输出。",
      "project": "把 compile_verilog / run_simulation / read_log 包成 MCP tools；返回结构化 status / evidence / artifacts，而不是大段 stdout。",
      "review": "用一页纸说明 MCP 在 EDA Agent 里解决的是哪一层问题、没有解决哪一层问题。",
      "deliverable": "EDA MCP server v0 + client trace；三个工具可稳定发现与调用。",
      "book": "Ch4",
      "resourceIds": [
        "R01",
        "R03",
        "R04"
      ],
      "plannedHours": 8,
      "actualHours": null,
      "status": "未开始",
      "notes": ""
    },
    {
      "date": "2026-08-20",
      "week": "W2",
      "day": "D9",
      "topic": "Production Tool Design",
      "theory": "Ch4：事件驱动/异步；补 tool schema、timeout、retry、idempotence、permission、human-in-loop。",
      "lab": "故意喂 malformed args / missing file / timeout，定义错误类型与是否可重试。",
      "project": "统一 ToolResult envelope；实现并发 run_simulation(seeds/cases) 和 timeout；工具失败不能把 Agent 状态弄乱。",
      "review": "复盘 5 种 tool failure，写出 agent 应该 retry / ask / stop 的规则。",
      "deliverable": "tool_contract.md + error taxonomy + concurrency tests。",
      "book": "Ch4",
      "resourceIds": [
        "R03",
        "R04"
      ],
      "plannedHours": 8,
      "actualHours": null,
      "status": "未开始",
      "notes": ""
    },
    {
      "date": "2026-08-21",
      "week": "W2",
      "day": "D10",
      "topic": "MCP Verification Agent v0.2",
      "theory": "学习 tool discovery/router 与 RAG + tool 的分工；不引入 LangGraph 作为必需依赖。",
      "lab": "固定一个 fail case，只给 Agent 用户目标，看它能否自主选择检索和仿真工具。",
      "project": "整合 retrieval + MCP + agent；跑 10 个固定场景并记录 tool-call success、无效调用次数、最终证据。",
      "review": "周复盘：删掉一个不必要的工具；写出下周 Coding Agent 需要的 workspace 权限边界。",
      "deliverable": "Verification Agent v0.2 + 10-case trace；工具调用成功率有基线。",
      "book": "Ch3–4",
      "resourceIds": [
        "R01",
        "R03",
        "R04"
      ],
      "plannedHours": 8,
      "actualHours": null,
      "status": "未开始",
      "notes": ""
    },
    {
      "date": "2026-08-24",
      "week": "W3",
      "day": "D11",
      "topic": "Coding Agent",
      "theory": "Ch5：workspace、search/read/edit、diff、test loop、checkpoint；理解代码是“元工具”。",
      "lab": "实现受限的 read/search/patch/test 四个 workspace 操作；禁止无边界 shell。",
      "project": "让 Agent 修复一个简单 RTL bug：先定位、出 patch、跑 regression、失败再迭代；保存每轮 diff/evidence。",
      "review": "检查 agent 是否出现“没跑 test 就宣布成功”；把这一条加入 eval rubric。",
      "deliverable": "coding-agent mini demo + patch trace；修复必须由 test 关闭。",
      "book": "Ch5",
      "resourceIds": [
        "R01"
      ],
      "plannedHours": 8,
      "actualHours": null,
      "status": "未开始",
      "notes": ""
    },
    {
      "date": "2026-08-25",
      "week": "W3",
      "day": "D12",
      "topic": "SystemVerilog DV Refresher",
      "theory": "快速补数字 DV：always_ff/always_comb、blocking/NBA、clock/reset、interface、TB scheduling；只补工作需要。",
      "lab": "做 10 个小 RTL/TB 练习，重点是时序语义和常见 race。",
      "project": "用 cocotb + Verilator/Icarus 给 FIFO/UART 之一搭最小 testbench：clock/reset、driver、monitor、scoreboard。",
      "review": "写出 5 个“全定制验证背景转数字 DV”最容易混淆的点。",
      "deliverable": "可重复运行的 cocotb TB + 10 个小练习答案。",
      "book": "DV 补课",
      "resourceIds": [
        "R05",
        "R06"
      ],
      "plannedHours": 8,
      "actualHours": null,
      "status": "未开始",
      "notes": ""
    },
    {
      "date": "2026-08-26",
      "week": "W3",
      "day": "D13",
      "topic": "SVA Fundamentals",
      "theory": "学习 immediate/concurrent assertion、sequence/property、|-> / |=>、disable iff、$past/$rose/$fell；注意不同开源前端支持范围。",
      "lab": "把 15 条自然语言 requirement 手写成 SVA/property；逐条解释采样周期。",
      "project": "在你可用的 simulator/formal 前端上验证支持的子集；对 unsupported syntax 单独登记，不把工具限制误判为语义错误。",
      "review": "复盘 3 个 vacuous/采样时序相关陷阱。",
      "deliverable": "assertions.sv + 15 条 requirement mapping + simulator limitation note。",
      "book": "SVA",
      "resourceIds": [
        "R06",
        "R07",
        "R08"
      ],
      "plannedHours": 8,
      "actualHours": null,
      "status": "未开始",
      "notes": ""
    },
    {
      "date": "2026-08-27",
      "week": "W3",
      "day": "D14",
      "topic": "Formal Verification",
      "theory": "Formal 基础：assume/assert/cover、bounded proof、unbounded 概念、counterexample；external verifier 思维。",
      "lab": "跑 SymbiYosys quickstart，读懂 PASS/FAIL 和一个 counterexample。",
      "project": "给 FIFO 加 5 个 safety properties；故意制造 2 个 bug；实现 CEX → JSON/evidence 的解析层供 Agent 查询。",
      "review": "解释为什么“LLM 再想一遍”不能替代 formal/simulation。",
      "deliverable": "formal harness + 5 properties + cex.json；2 个故障可稳定复现。",
      "book": "Formal",
      "resourceIds": [
        "R07"
      ],
      "plannedHours": 8,
      "actualHours": null,
      "status": "未开始",
      "notes": ""
    },
    {
      "date": "2026-08-28",
      "week": "W3",
      "day": "D15",
      "topic": "UVM Mental Model + cocotb",
      "theory": "用 Accellera UVM mental model 理解 sequence/driver/monitor/scoreboard/coverage，不追求一周手写完整 UVM。",
      "lab": "画 UVM component ↔ 当前 cocotb 环境的功能映射。",
      "project": "扩展 FIFO TB：randomized sequence、scoreboard、coverage proxy/统计；把它整理成 Project A 的可复用 verification harness。",
      "review": "周复盘：列出 Project A 还缺的 spec traceability / assertion / formal / debug 闭环。",
      "deliverable": "Project A skeleton + verification architecture 图。",
      "book": "UVM 概念",
      "resourceIds": [
        "R05",
        "R08"
      ],
      "plannedHours": 8,
      "actualHours": null,
      "status": "未开始",
      "notes": ""
    },
    {
      "date": "2026-08-31",
      "week": "W4",
      "day": "D16",
      "topic": "Spec → Verification Plan",
      "theory": "学习 requirement → feature → stimulus/check → coverage → evidence 的 traceability。",
      "lab": "为 FIFO/UART/arbiter 中选定设计写 10–20 条结构化 requirement，并给唯一 ID。",
      "project": "实现 spec_to_vplan()，输出 JSON：ReqID、test、assertion、coverage intent、依赖 signal、验收条件。",
      "review": "抽查 5 个 requirement：vPlan 是否真的能验证，而不是只是重述 spec。",
      "deliverable": "vplan.json + traceability matrix；每条 requirement 至少对应一个 checker/test。",
      "book": "Verification Planning",
      "resourceIds": [
        "R13"
      ],
      "plannedHours": 8,
      "actualHours": null,
      "status": "未开始",
      "notes": ""
    },
    {
      "date": "2026-09-01",
      "week": "W4",
      "day": "D17",
      "topic": "Spec → SVA/TB Generation",
      "theory": "结构化输出、constrained generation、compile feedback；明确 syntax-valid ≠ semantically-correct。",
      "lab": "从 10 条 requirement 生成 assertion/test skeleton，并人工标 gold intent。",
      "project": "实现生成 → compile/lint → tool feedback → repair；repair 只能依据明确 error/evidence，不允许无限 self-reflection。",
      "review": "记录首轮通过率、repair 后通过率、仍失败的语义类型。",
      "deliverable": "generator v0 + 10-case syntax/semantic checklist。",
      "book": "Agent + DV",
      "resourceIds": [
        "R06",
        "R07",
        "R13"
      ],
      "plannedHours": 8,
      "actualHours": null,
      "status": "未开始",
      "notes": ""
    },
    {
      "date": "2026-09-02",
      "week": "W4",
      "day": "D18",
      "topic": "Simulation Feedback Loop",
      "theory": "学习 compile/runtime/assert/scoreboard/timeout 五类 failure 与 artifact 管理。",
      "lab": "把一个 test 的 log、VCD、seed、commit/input 组织成可追溯 run bundle。",
      "project": "实现 verify_case()：统一返回 status、failure_class、evidence、artifacts、runtime；失败时 Agent 决定下一 tool。",
      "review": "检查任何 final answer 是否能追到 run_id / evidence。",
      "deliverable": "标准 RunResult schema + 至少 10 个可重复 run bundle。",
      "book": "Simulation",
      "resourceIds": [
        "R05",
        "R06"
      ],
      "plannedHours": 8,
      "actualHours": null,
      "status": "未开始",
      "notes": ""
    },
    {
      "date": "2026-09-03",
      "week": "W4",
      "day": "D19",
      "topic": "Formal Feedback + RCA",
      "theory": "学习 counterexample-guided hypothesis：提出 root-cause 假设后必须调用 deterministic verifier 验证。",
      "lab": "注入 5 个 RTL mutants，人工写 ground-truth root cause。",
      "project": "Agent 使用 formal CEX + source + hierarchy 做 Top-3 hypotheses；选实验/属性重跑以排除错误假设。",
      "review": "给每个 claim 标 evidence；统计 Top-1/Top-3 mini score。",
      "deliverable": "5-mutant RCA report + hypothesis/retest trace。",
      "book": "Formal + RCA",
      "resourceIds": [
        "R07",
        "R14"
      ],
      "plannedHours": 8,
      "actualHours": null,
      "status": "未开始",
      "notes": ""
    },
    {
      "date": "2026-09-04",
      "week": "W4",
      "day": "D20",
      "topic": "Project A v1 Integration",
      "theory": "复盘 Agent boundary：plan、tool、verifier、context、state、report 各自职责。",
      "lab": "从空状态演练一个完整 case，找断点/隐藏人工步骤。",
      "project": "串起 Spec → vPlan → SVA/TB → simulation/formal → debug/RCA；至少 10 个故障 case 全流程。",
      "review": "写 README、架构、known limits；确定 W5–6 的 debug/eval 基线。",
      "deliverable": "Project A v1：一键 demo + 10-case benchmark v0。",
      "book": "综合",
      "resourceIds": [
        "R05",
        "R07",
        "R13",
        "R14"
      ],
      "plannedHours": 8,
      "actualHours": null,
      "status": "未开始",
      "notes": ""
    },
    {
      "date": "2026-09-07",
      "week": "W5",
      "day": "D21",
      "topic": "Long-context EDA Strategy",
      "theory": "重读 Ch2 高级部分：context budget/router/compression；模型补充 long-context、KV cache、prefill 成本。",
      "lab": "给一次 debug 任务设固定 token budget，手工选择最小充分 context。",
      "project": "实现 context router：Spec / hierarchy / log / waveform summary / history 按需拉取，并记录“为什么选它”。",
      "review": "设计 W5 ablation：full raw context vs structured/tool-driven context。",
      "deliverable": "context_router v1 + 选择日志 + ablation protocol。",
      "book": "Ch2 回访",
      "resourceIds": [
        "R01",
        "R18"
      ],
      "plannedHours": 8,
      "actualHours": null,
      "status": "未开始",
      "notes": ""
    },
    {
      "date": "2026-09-08",
      "week": "W5",
      "day": "D22",
      "topic": "Waveform Query API",
      "theory": "理解 VCD event model、time/cycle、edge 与 window；原则：波形大数据留在工具侧。",
      "lab": "解析一份 VCD，手工核对几个 timestamp/value change。",
      "project": "实现 get_value / transitions / edges / window / edge_to_edge_delay / duty_cycle，并给每个函数写 deterministic unit test。",
      "review": "记录 raw waveform → structured evidence 的压缩比例。",
      "deliverable": "waveform_tools.py + 单测；数值结果与手工/脚本 gold 一致。",
      "book": "Waveform",
      "resourceIds": [
        "R05",
        "R14"
      ],
      "plannedHours": 8,
      "actualHours": null,
      "status": "未开始",
      "notes": ""
    },
    {
      "date": "2026-09-09",
      "week": "W5",
      "day": "D23",
      "topic": "Pass/Fail Waveform Compare",
      "theory": "学习 first divergence、依赖路径、clock-domain/time-window 与“相关 ≠ 因果”。",
      "lab": "准备 golden/pass 与 mutant/fail 两组波形；人工找 first divergence。",
      "project": "实现 compare_pass_fail / find_first_divergence / rank_candidate_signals；允许 Agent 逐步扩大 signal/window。",
      "review": "对自动排名 Top-5 与人工判断做一次对照。",
      "deliverable": "waveform diff report + candidate ranking；first divergence 可复现。",
      "book": "Waveform RCA",
      "resourceIds": [
        "R14"
      ],
      "plannedHours": 8,
      "actualHours": null,
      "status": "未开始",
      "notes": ""
    },
    {
      "date": "2026-09-10",
      "week": "W5",
      "day": "D24",
      "topic": "Regression Triage",
      "theory": "学习 regression metadata、failure signature、聚类/去重、代表 case 选择。",
      "lab": "生成或收集 20 个公开/合成 failure logs + run metadata。",
      "project": "实现 triage：按 error/assertion/signature 聚类，选择 representative failure，再将 cluster 交给 Debug Agent。",
      "review": "统计 20 runs 压成多少 cluster，人工检查误聚类。",
      "deliverable": "triage.csv + representative cases + precision spot-check。",
      "book": "Debug",
      "resourceIds": [
        "R14"
      ],
      "plannedHours": 8,
      "actualHours": null,
      "status": "未开始",
      "notes": ""
    },
    {
      "date": "2026-09-11",
      "week": "W5",
      "day": "D25",
      "topic": "Waveform Debug Agent v0",
      "theory": "阅读 VerilogCoder 的 graph planning / AST waveform tracing 思路，思考哪些能迁移到你的 debug。",
      "lab": "人工对 1 个 mutant 做 RCA，记录你看信号/时间窗的顺序作为 expert baseline。",
      "project": "Agent 自动选 signal/window → query waveform → 对比 golden → 形成 evidence-based RCA；跑 10 个 mutants。",
      "review": "比较 agent vs expert baseline：看了多少 signal、多少 tool calls、Top-1 RCA。",
      "deliverable": "Waveform Debug Agent v0 + 10-case score；形成你的差异化模块。",
      "book": "Debug Agent",
      "resourceIds": [
        "R14"
      ],
      "plannedHours": 8,
      "actualHours": null,
      "status": "未开始",
      "notes": ""
    },
    {
      "date": "2026-09-14",
      "week": "W6",
      "day": "D26",
      "topic": "Agent Eval Design",
      "theory": "Ch6：task/environment/metric、统计显著性、benchmark contamination；读 AssertLLM2 的评估维度。",
      "lab": "定义 RCA rubric：Top-1/Top-3、evidence completeness、unsupported claim penalty。",
      "project": "建立版本化 eval case schema：input、gold root cause、allowed tools、success criteria、seed、budget。",
      "review": "让另一个脚本只按 rubric 打分，不依赖 Agent 自评。",
      "deliverable": "eval_protocol.md + case_schema.json + 10 个 seed cases。",
      "book": "Ch6",
      "resourceIds": [
        "R01",
        "R12"
      ],
      "plannedHours": 8,
      "actualHours": null,
      "status": "未开始",
      "notes": ""
    },
    {
      "date": "2026-09-15",
      "week": "W6",
      "day": "D27",
      "topic": "Mutation Dataset",
      "theory": "学习 mutation testing：不是随机改代码，而是可控地产生真实验证故障类别。",
      "lab": "实现 operator/reset/condition/FSM/missing assignment 等 5 类 mutation 模板。",
      "project": "生成 ≥30 个 mutants；每个都有 seed、diff、gold root cause；先验证 golden PASS、mutant FAIL。",
      "review": "抽查 10 个 mutant 是否 trivial/重复，剔除无效样本。",
      "deliverable": "mutation_manifest.csv + ≥30 valid cases。",
      "book": "Eval 数据",
      "resourceIds": [
        "R12",
        "R13"
      ],
      "plannedHours": 8,
      "actualHours": null,
      "status": "未开始",
      "notes": ""
    },
    {
      "date": "2026-09-16",
      "week": "W6",
      "day": "D28",
      "topic": "Automated Eval Harness",
      "theory": "学习 outcome metric 与 proxy metric 区别；把 cost/time/tool count 一并记录。",
      "lab": "手跑 2 个 case，核对自动评分和人工评分一致。",
      "project": "自动计算 detection rate、RCA Top-1/Top-3、tool success、unsupported claims、sim count、latency、tokens/cost。",
      "review": "检查失败 case 的 trace 是否足够定位 Agent 自身问题。",
      "deliverable": "results.csv/json + 可重复 eval command。",
      "book": "Ch6",
      "resourceIds": [
        "R12",
        "R13"
      ],
      "plannedHours": 8,
      "actualHours": null,
      "status": "未开始",
      "notes": ""
    },
    {
      "date": "2026-09-17",
      "week": "W6",
      "day": "D29",
      "topic": "Ablation Experiments",
      "theory": "学习 ablation 与随机性控制；同一模型/参数/seed 尽量固定，必要时重复 ≥3 次。",
      "lab": "定义三组对照：无 tool vs tool；raw context vs structured；raw waveform summary vs query API。",
      "project": "在代表性 case 子集跑 ablation；输出成功率、Top-1、tool count、tokens、latency。",
      "review": "只写数据能支持的结论，区分“趋势”与“显著”。",
      "deliverable": "ablation_report.md + comparison table。",
      "book": "Eval",
      "resourceIds": [
        "R11",
        "R12"
      ],
      "plannedHours": 8,
      "actualHours": null,
      "status": "未开始",
      "notes": ""
    },
    {
      "date": "2026-09-18",
      "week": "W6",
      "day": "D30",
      "topic": "Project A v2 Freeze",
      "theory": "读 AutoChip + EDA-tool-feedback 工作：比较“compiler/sim feedback loop”和你的 verification/debug loop。",
      "lab": "挑 benchmark 最差的 3 类 failure，做 failure analysis。",
      "project": "只针对真实失败模式改 context/tool/prompt/state，再跑完整 ≥30-case benchmark；固定版本。",
      "review": "周复盘：整理 3 个 demo case，记录已知局限和下一步数据需求。",
      "deliverable": "Project A v2 + benchmark report + 3 个可讲清楚的 demo。",
      "book": "Ch6 + Paper",
      "resourceIds": [
        "R09",
        "R10",
        "R11",
        "R13"
      ],
      "plannedHours": 8,
      "actualHours": null,
      "status": "未开始",
      "notes": ""
    },
    {
      "date": "2026-09-21",
      "week": "W7",
      "day": "D31",
      "topic": "ngspice Automation Harness",
      "theory": "你已懂全定制，本日只补自动化：ngspice batch/control/raw 输出；明确只使用公开/自建 circuit/model。",
      "lab": "跑一个 CMOS inverter transient；从命令行保存可脚本解析的数据。",
      "project": "实现 run_spice(netlist, params)：timeout、exit status、log、waveform artifact；把 simulator 异常与 circuit fail 分开。",
      "review": "检查可重复性：同 input 是否得到一致测量。",
      "deliverable": "run_spice() + inverter smoke test + standard result schema。",
      "book": "Full-custom",
      "resourceIds": [
        "R15"
      ],
      "plannedHours": 8,
      "actualHours": null,
      "status": "未开始",
      "notes": ""
    },
    {
      "date": "2026-09-22",
      "week": "W7",
      "day": "D32",
      "topic": "Analog Waveform Measurement Tools",
      "theory": "把你的人工开波形经验工具化：threshold crossing、delay、slew、overshoot、min/max、margin；定义单位和插值规则。",
      "lab": "实现并手工核对 5 个 measurement functions。",
      "project": "扩成 query_analog_waveform API：窗口化测量、两信号 delay、pass/fail compare；写 deterministic unit tests。",
      "review": "记录“LLM 绝不能自己估数值”的测量清单。",
      "deliverable": "analog_waveform_tools.py + 数值 gold tests。",
      "book": "Waveform",
      "resourceIds": [
        "R15"
      ],
      "plannedHours": 8,
      "actualHours": null,
      "status": "未开始",
      "notes": ""
    },
    {
      "date": "2026-09-23",
      "week": "W7",
      "day": "D33",
      "topic": "Memory-style Test Circuit",
      "theory": "选公开/自建 6T SRAM cell 或简化 sense-amplifier path；定义 read/write/sense timing 与 failure criteria，不使用公司 PDK/IP。",
      "lab": "生成一个 golden transient，手工标出关键测量窗口/节点。",
      "project": "通过 VDD / device param / RC / load 等公开参数构造 ≥5 个 pass/fail variants；保存 ground truth 与预期 failure mechanism。",
      "review": "检查故障是否真的具有波形诊断价值，而不是一眼从参数名猜答案。",
      "deliverable": "memory_waveform_dataset v0：golden + ≥5 failure cases。",
      "book": "Memory/Analog",
      "resourceIds": [
        "R15"
      ],
      "plannedHours": 8,
      "actualHours": null,
      "status": "未开始",
      "notes": ""
    },
    {
      "date": "2026-09-24",
      "week": "W7",
      "day": "D34",
      "topic": "Hypothesis → Re-run Loop",
      "theory": "学习实验式 RCA：hypothesis 必须可证伪；Agent 通过 sweep/corner/re-measure 选择下一实验。",
      "lab": "设计 Hypothesis JSON：claim、evidence、discriminator experiment、expected outcome。",
      "project": "增加 run_sweep / compare_waveforms / measure_timing/margin；Agent 最多 N 轮，确认或否决假设并保留 trace。",
      "review": "复盘 3 个闭环：哪一次重跑真正提供了信息增益？",
      "deliverable": "≥3 条 hypothesis→experiment→decision 完整 trace。",
      "book": "Agentic Debug",
      "resourceIds": [
        "R15"
      ],
      "plannedHours": 8,
      "actualHours": null,
      "status": "未开始",
      "notes": ""
    },
    {
      "date": "2026-09-25",
      "week": "W7",
      "day": "D35",
      "topic": "Project B v0: Full-Custom Debug Agent",
      "theory": "把你真实工作中的 debug 顺序抽象成工具/状态机；定义 expert baseline 和 evidence rubric。",
      "lab": "人工 debug 1 个 case 并计时，记录看了哪些 waveform/measure。",
      "project": "Full-Custom Waveform Debug Agent 跑 ≥5 个故障/corner：自动选择测量 → 比较 → 假设 → 重跑 → RCA。",
      "review": "比较 Agent 与 expert baseline，写清楚哪些任务能自动化、哪些必须 human-in-loop。",
      "deliverable": "Project B v0 + 5-case report + 架构 + known limits。",
      "book": "Full-custom Agent",
      "resourceIds": [
        "R15"
      ],
      "plannedHours": 8,
      "actualHours": null,
      "status": "未开始",
      "notes": ""
    },
    {
      "date": "2026-09-28",
      "week": "W8",
      "day": "D36",
      "topic": "Post-training Decision",
      "theory": "Ch7 选读：pretrain/SFT/LoRA/DPO/RL、tool-use training；重点学“什么时候不该 fine-tune”。读 ChipNeMo。",
      "lab": "做决策表：Prompt/Skill、RAG、Tool、SFT、RL 各自解决什么问题。",
      "project": "基于 Project A/B failure trace，判断哪些失败能靠 context/tool 修，哪些才可能需要 SFT；设计 synthetic/public training schema。",
      "review": "写一条 IP 红线：公司 spec/netlist/log/waveform 不进入个人训练集/公开仓库。",
      "deliverable": "domain_adaptation_strategy.md；能解释为何此刻是否需要 SFT。",
      "book": "Ch7 选读",
      "resourceIds": [
        "R01",
        "R16"
      ],
      "plannedHours": 8,
      "actualHours": null,
      "status": "未开始",
      "notes": ""
    },
    {
      "date": "2026-09-29",
      "week": "W8",
      "day": "D37",
      "topic": "Model Serving & Tool Calling",
      "theory": "模型补洞：prefill/decode、KV cache、batching、quantization、TTFT/TPOT；看 vLLM serving/tool-calling。",
      "lab": "有 GPU：serve 一个小型 tool-calling model；无 GPU：用 provider adapter 完成相同接口测试。",
      "project": "抽象 ModelAdapter，至少支持一个远端/本地 backend；测 10 个 tool-call 的结构正确率、latency、token usage。",
      "review": "比较本地部署价值：IP、成本、吞吐、模型能力的 trade-off。",
      "deliverable": "model_adapter + latency/tool-call compatibility report。",
      "book": "Serving",
      "resourceIds": [
        "R17",
        "R18"
      ],
      "plannedHours": 8,
      "actualHours": null,
      "status": "未开始",
      "notes": ""
    },
    {
      "date": "2026-09-30",
      "week": "W8",
      "day": "D38",
      "topic": "Production Agent Engineering",
      "theory": "学习 async job、retry/backoff、timeout、checkpoint/resume、state persistence、tracing、audit、permission、HITL。",
      "lab": "故意注入 simulator timeout / malformed output / process failure。",
      "project": "加 job state 与 checkpoint；中断后可 resume；限制可写目录/高风险 tool；重要判断保留 audit trace。",
      "review": "用 reliability checklist 逐条过 Project A/B。",
      "deliverable": "production hardening + failure-injection tests。",
      "book": "Production",
      "resourceIds": [
        "R03",
        "R04",
        "R17"
      ],
      "plannedHours": 8,
      "actualHours": null,
      "status": "未开始",
      "notes": ""
    },
    {
      "date": "2026-10-01",
      "week": "W8",
      "day": "D39",
      "topic": "Continuous Learning + Multi-Agent 选读",
      "theory": "Ch8/Ch10 选读：trajectory → knowledge/instruction/program；只有上下文/并行边界明确时才拆 multi-agent。",
      "lab": "从 W6 eval traces 找 3 个重复失败模式，判断应该改 context、tool、skill 还是 model。",
      "project": "基于 trace 做一次可测改进；只有单 Agent 出现明确瓶颈时才试 planner/sim/formal/waveform 分工，并用同一 benchmark 比较。",
      "review": "写 decision memo：是否值得 multi-agent，证据是什么。",
      "deliverable": "trace-driven improvement + multi-agent decision memo。",
      "book": "Ch8/10 选读",
      "resourceIds": [
        "R01"
      ],
      "plannedHours": 8,
      "actualHours": null,
      "status": "未开始",
      "notes": ""
    },
    {
      "date": "2026-10-02",
      "week": "W8",
      "day": "D40",
      "topic": "Portfolio v1.0 + Next 90 Days",
      "theory": "把项目按面试/内部转岗可讲结构整理：问题 → 架构 → deterministic verifier → eval → 数据结果 → limitation。",
      "lab": "做一次 15 分钟 mock demo/讲解；删掉无法证实的“AI 提效”表述。",
      "project": "跑全套 test/eval；冻结 Project A/B v1.0；README、架构、demo script、benchmark、security/IP statement 全部可复现。",
      "review": "写下一阶段 90 天路线：优先把一个真实内部验证 workflow 接入，而不是继续堆 Agent 框架。",
      "deliverable": "两个作品 v1.0 + 15min demo + 90-day plan；8 周学习闭环完成。",
      "book": "综合",
      "resourceIds": [
        "R09",
        "R12",
        "R14",
        "R16"
      ],
      "plannedHours": 8,
      "actualHours": null,
      "status": "未开始",
      "notes": ""
    }
  ],
  "resources": [
    {
      "id": "R01",
      "type": "主教材",
      "resource": "ai-agent-book /《深入理解 AI Agent》",
      "use": "Ch1–8/10 主线；优先跑与当前周直接相关实验",
      "priority": "必做",
      "url": "https://github.com/bojieli/ai-agent-book",
      "notes": "截至 2026-08-06：主仓库为 10 章、95 个配套实验；不要全刷。"
    },
    {
      "id": "R02",
      "type": "主教材",
      "resource": "ai-agent-book 学习建议",
      "use": "理解官方章节分组与实践建议",
      "priority": "必做",
      "url": "https://github.com/bojieli/ai-agent-book/blob/main/docs/zh-CN/LEARNING.md",
      "notes": "用来校准章节优先级。"
    },
    {
      "id": "R03",
      "type": "Agent/MCP",
      "resource": "MCP Introduction（2026-07-28）",
      "use": "W2 MCP client/server、resources/tools/prompts",
      "priority": "必做",
      "url": "https://modelcontextprotocol.io/docs/2026-07-28/getting-started/intro",
      "notes": "按当前规范理解概念，避免只看旧教程。"
    },
    {
      "id": "R04",
      "type": "Agent/MCP",
      "resource": "MCP Tools Specification（2026-07-28）",
      "use": "W2/W8 tool schema、discovery、errors、HITL",
      "priority": "必做",
      "url": "https://modelcontextprotocol.io/specification/2026-07-28/server/tools",
      "notes": "重点看 tool metadata、structured content、error/security。"
    },
    {
      "id": "R05",
      "type": "Digital DV",
      "resource": "cocotb 2.0.1 Quickstart",
      "use": "Python testbench、simulator integration",
      "priority": "必做",
      "url": "https://docs.cocotb.org/en/stable/quickstart.html",
      "notes": "适合快速搭可脚本化 verification harness。"
    },
    {
      "id": "R06",
      "type": "Digital DV",
      "resource": "Verilator 5.050 Language Guide",
      "use": "SystemVerilog/assertion/coverage 支持边界",
      "priority": "必做",
      "url": "https://verilator.org/guide/latest/languages.html",
      "notes": "官方明确 assertion/coverage 为部分支持；练习时记录限制。"
    },
    {
      "id": "R07",
      "type": "Formal",
      "resource": "SymbiYosys Documentation",
      "use": "BMC/formal/CEX 与自动化",
      "priority": "必做",
      "url": "https://yosyshq.readthedocs.io/projects/sby/en/latest/quickstart.html",
      "notes": "W3–4 formal 主实验工具。"
    },
    {
      "id": "R08",
      "type": "UVM",
      "resource": "Accellera UVM Community / Standard",
      "use": "建立 sequence/driver/monitor/scoreboard/coverage mental model",
      "priority": "选读",
      "url": "https://www.accellera.org/community/uvm",
      "notes": "目标是读懂工业 DV 语言，不要求 8 周内成为 UVM 专家。"
    },
    {
      "id": "R09",
      "type": "AI4IC Paper",
      "resource": "AutoChip: Automating HDL Generation Using LLM Feedback",
      "use": "理解 compiler/simulation feedback loop",
      "priority": "必读",
      "url": "https://arxiv.org/abs/2311.04887",
      "notes": "W6 对照自己的闭环。"
    },
    {
      "id": "R10",
      "type": "AI4IC Code",
      "resource": "AutoChip GitHub",
      "use": "看开源实现与 Icarus feedback 组织方式",
      "priority": "选读",
      "url": "https://github.com/shailja-thakur/AutoChip",
      "notes": "不要照搬，重点看 eval/feedback interface。"
    },
    {
      "id": "R11",
      "type": "AI4IC Paper",
      "resource": "Can EDA Tool Feedback Improve Verilog Generation by LLMs?",
      "use": "理解 tool feedback 并非对所有模型都稳定有效",
      "priority": "必读",
      "url": "https://arxiv.org/abs/2411.11856",
      "notes": "W6 ablation 的方法论参考。"
    },
    {
      "id": "R12",
      "type": "AI4IC Eval",
      "resource": "AssertLLM2 (2026)",
      "use": "SVA 生成的 syntax/provability/coverage/mutation bug detection eval",
      "priority": "必读",
      "url": "https://arxiv.org/abs/2605.27472",
      "notes": "W6 重点：把“像对”变成“可验证地对”。"
    },
    {
      "id": "R13",
      "type": "AI4IC Benchmark",
      "resource": "NVLabs VerilogEval",
      "use": "RTL generation/eval harness 与 dataset",
      "priority": "必做一部分",
      "url": "https://github.com/NVlabs/verilog-eval",
      "notes": "借鉴 benchmark 组织，不要求把整个榜跑一遍。"
    },
    {
      "id": "R14",
      "type": "AI4IC Debug",
      "resource": "NVLabs VerilogCoder",
      "use": "graph planning + AST-based waveform tracing 的公开 Agent 实例",
      "priority": "必读",
      "url": "https://github.com/NVlabs/VerilogCoder",
      "notes": "W5 与你的 waveform debug 方向高度相关。"
    },
    {
      "id": "R15",
      "type": "Full-custom",
      "resource": "ngspice Documentation v46",
      "use": "SPICE batch/control/raw data 与自动化",
      "priority": "必做",
      "url": "https://ngspice.sourceforge.io/docs.html",
      "notes": "你已有全定制经验，跳过基础电路课，直接做自动化工具层。"
    },
    {
      "id": "R16",
      "type": "Domain LLM",
      "resource": "NVIDIA ChipNeMo",
      "use": "domain adaptation：continued pretraining/SFT/retrieval 的工业案例",
      "priority": "必读",
      "url": "https://research.nvidia.com/publication/2023-10_chipnemo-domain-adapted-llms-chip-design",
      "notes": "W8 用来判断何时值得模型适配。"
    },
    {
      "id": "R17",
      "type": "Serving",
      "resource": "vLLM Documentation",
      "use": "本地/私有部署、OpenAI-compatible serving、tool calling",
      "priority": "选做",
      "url": "https://docs.vllm.ai/en/latest/",
      "notes": "有 GPU 就动手；无 GPU 不让部署阻塞主项目。"
    },
    {
      "id": "R18",
      "type": "模型补洞",
      "resource": "Hugging Face LLM Course — Inference Deep Dive",
      "use": "prefill/decode、KV cache、TTFT/TPOT",
      "priority": "选读",
      "url": "https://huggingface.co/learn/llm-course/chapter1/8",
      "notes": "AI 硕士背景下只补 Agent 工程真正需要的 inference 知识。"
    },
    {
      "id": "R19",
      "type": "EDA Flow 认知",
      "resource": "OpenROAD Documentation",
      "use": "理解开放 RTL→GDSII 工具链和 EDA command interface",
      "priority": "可选",
      "url": "https://openroad.readthedocs.io/",
      "notes": "不是这 8 周主线；想扩到 AI for Design 时再深入。"
    }
  ],
  "milestones": [
    {
      "milestone": "M1 / W1",
      "due": "2026-08-14",
      "deliverable": "Verification Agent v0",
      "acceptance": "手写 Agent loop；≥5 类验证工具；至少 1 个 fail→evidence→RCA 案例可重复；README 说明模型/工具边界。",
      "metrics": "闭环可跑；RCA 有源证据",
      "ipRule": "只用公开/自建 RTL/log；不接公司文件",
      "status": "未开始",
      "evidence": ""
    },
    {
      "milestone": "M2 / W2",
      "due": "2026-08-21",
      "deliverable": "MCP Verification Agent v0.2",
      "acceptance": "MCP server 暴露 compile/sim/log；RAG + structured retrieval；10 fixed scenarios；错误/timeout 可控。",
      "metrics": "tool-call success；无效调用数",
      "ipRule": "工具限定目录/参数；不开放无边界 shell",
      "status": "未开始",
      "evidence": ""
    },
    {
      "milestone": "M3 / W3",
      "due": "2026-08-28",
      "deliverable": "RTL Verification Harness",
      "acceptance": "cocotb TB + scoreboard；SVA 练习；SymbiYosys formal POC；CEX 结构化。",
      "metrics": "TB 可复现；5 formal properties",
      "ipRule": "记录开源 simulator/SVA 支持边界",
      "status": "未开始",
      "evidence": ""
    },
    {
      "milestone": "M4 / W4",
      "due": "2026-09-04",
      "deliverable": "Project A v1",
      "acceptance": "Spec→vPlan→SVA/TB→sim/formal→RCA；≥10 故障 case；全链路 traceability。",
      "metrics": "Top-1/Top-3 mini baseline；10 cases",
      "ipRule": "禁止把语法通过当成功；必须 simulation/formal closure",
      "status": "未开始",
      "evidence": ""
    },
    {
      "milestone": "M5 / W5",
      "due": "2026-09-11",
      "deliverable": "Waveform Debug Agent v0",
      "acceptance": "波形保留在 tool 侧；query/compare/divergence/rank tools；10 mutants；与 expert baseline 对照。",
      "metrics": "Top-1 RCA；signal/tool count；time",
      "ipRule": "LLM 不自行估 waveform 数值；测量由 deterministic tool 完成",
      "status": "未开始",
      "evidence": ""
    },
    {
      "milestone": "M6 / W6",
      "due": "2026-09-18",
      "deliverable": "Project A v2 Benchmark",
      "acceptance": "≥30 valid mutants；自动 eval；至少 3 组 ablation；结果可重跑；README/demo/known limits。",
      "metrics": "Detection；Top-1/3；unsupported claims；latency/tokens",
      "ipRule": "报告失败和局限；不挑 case 只展示好结果",
      "status": "未开始",
      "evidence": ""
    },
    {
      "milestone": "M7 / W7",
      "due": "2026-09-25",
      "deliverable": "Project B v0 — Full-Custom Waveform Agent",
      "acceptance": "ngspice + analog measurement tools；公开/自建 memory-style circuit；≥5 failures；hypothesis→rerun closure。",
      "metrics": "RCA 准确性；测量正确性；rerun 信息增益",
      "ipRule": "禁止公司 PDK/model/spec/netlist/waveform；参数/模型必须公开或自建",
      "status": "未开始",
      "evidence": ""
    },
    {
      "milestone": "M8 / W8",
      "due": "2026-10-02",
      "deliverable": "Portfolio v1.0",
      "acceptance": "Project A/B 全套 test/eval；架构、demo script、benchmark、安全说明；15min 可讲清；下一阶段 90-day plan。",
      "metrics": "可复现；有数据；有 limitation；有 next step",
      "ipRule": "发布前再次做 IP/敏感信息检查",
      "status": "未开始",
      "evidence": ""
    }
  ],
  "modelMap": [
    {
      "priority": "S",
      "topic": "Transformer inference",
      "knowledge": "Tokenizer/embedding/attention/causal LM；prefill vs decode；KV cache；context window",
      "week": "W1 + W5",
      "depth": "工程理解",
      "exitCriteria": "能解释 context 长度如何影响 Agent latency/cost；能读 token/latency trace。",
      "deferred": "不重做完整 Transformer 数学课程。"
    },
    {
      "priority": "S",
      "topic": "Tool calling / structured generation",
      "knowledge": "function/tool schema、structured output、arguments validation、tool-use failure",
      "week": "W1–2",
      "depth": "熟练",
      "exitCriteria": "自己写 tool loop + MCP tools；异常参数/失败有 deterministic handling。",
      "deferred": "这是 Agent 工程核心，不等同于 prompt engineering。"
    },
    {
      "priority": "S",
      "topic": "Embedding / Retrieval",
      "knowledge": "dense/sparse/hybrid、reranker、chunking、metadata；结构化索引",
      "week": "W2",
      "depth": "熟练",
      "exitCriteria": "20-query retrieval eval；同时能用 hierarchy/connectivity 查证据。",
      "deferred": "IC 场景不要只会向量库。"
    },
    {
      "priority": "S",
      "topic": "Reasoning + External Verifier",
      "knowledge": "hypothesis、test-time reasoning、self-correction 边界；simulation/formal 作为裁判",
      "week": "W3–4",
      "depth": "熟练",
      "exitCriteria": "每个 RCA claim 能通过 tool evidence 或 rerun 验证/否决。",
      "deferred": "LLM 自我反思 ≠ verification。"
    },
    {
      "priority": "S",
      "topic": "Long Context / Context Compression",
      "knowledge": "context budget、router、summary、evidence preservation、KV/prefill cost",
      "week": "W1 + W5",
      "depth": "熟练",
      "exitCriteria": "full-context vs structured-context ablation；证据不丢失。",
      "deferred": "与波形/大 log 工具化直接相关。"
    },
    {
      "priority": "S",
      "topic": "Agent Evaluation",
      "knowledge": "task/env、gold、Top-k、mutation、ablation、统计/随机性、cost/latency",
      "week": "W6",
      "depth": "熟练",
      "exitCriteria": "≥30-case benchmark；能定位 Agent 失败在 model/context/tool 哪一层。",
      "deferred": "作品含 benchmark，而不只 demo。"
    },
    {
      "priority": "A",
      "topic": "SFT / LoRA",
      "knowledge": "监督微调、domain instruction/tool-use data、何时值得微调",
      "week": "W8",
      "depth": "会判断",
      "exitCriteria": "根据真实 eval failure 做 fine-tune decision；设计数据 schema。",
      "deferred": "现阶段不要求训练大模型。"
    },
    {
      "priority": "A",
      "topic": "Preference/RL",
      "knowledge": "DPO/RL/RLHF 基本思想、reward/verifier、tool-use internalization",
      "week": "W8",
      "depth": "理解",
      "exitCriteria": "能解释何时 RL 可能比 SFT 有意义，以及 verifier/reward 从哪里来。",
      "deferred": "不投入大量训练算力。"
    },
    {
      "priority": "A",
      "topic": "Serving / Deployment",
      "knowledge": "vLLM、batching、quantization、KV memory、TTFT/TPOT、本地/私有部署",
      "week": "W8",
      "depth": "能落地最小服务",
      "exitCriteria": "有 GPU 跑本地模型；无 GPU 做 provider adapter + latency/tool-call 测试。",
      "deferred": "IC IP 敏感，所以 on-prem 概念必须懂。"
    },
    {
      "priority": "B",
      "topic": "Continuous Learning",
      "knowledge": "从 trajectory 更新 knowledge/instruction/program/parameter",
      "week": "W8 选读",
      "depth": "理解",
      "exitCriteria": "从 W6 traces 找重复失败并做一次 trace-driven improvement。",
      "deferred": "先有可靠 eval，再谈持续进化。"
    },
    {
      "priority": "B",
      "topic": "Multi-Agent",
      "knowledge": "context isolation、并行、角色边界、coordination cost",
      "week": "W8 选读",
      "depth": "会判断",
      "exitCriteria": "用同一 benchmark 证明拆 agent 是否真的提升；没有证据就维持单 Agent。",
      "deferred": "不为 multi-agent 而 multi-agent。"
    },
    {
      "priority": "C",
      "topic": "Multimodal / GUI",
      "knowledge": "视觉/GUI/computer-use",
      "week": "暂缓",
      "depth": "知道即可",
      "exitCriteria": "知道未来可用于 schematic/layout/waveform GUI，但本轮不占主线时间。",
      "deferred": "8 周后按岗位需要再补。"
    }
  ]
};
