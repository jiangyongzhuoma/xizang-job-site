// 西藏公考通 - 智能问答助手
(function() {
  // ===== 知识库 =====
  const KB = [
    // 考试信息
    {q:'公务员什么时候报名', a:'西藏公务员考试（省考）一般在1月或12月报名。2026届公务员报名时间为2025年12月7日-12日，2025届报名时间为1月18日-23日。国考一般在10月中下旬报名。建议关注西藏人社厅官网通知。', tags:['报名','时间','公务员','省考','国考']},
    {q:'事业编什么时候考试', a:'西藏事业单位招聘一般在5月发布公告，6月初报名，6月下旬笔试。2025年笔试时间为6月21日。上午考综合管理类(A/E/Z类)，下午考社科类(B/C/D类)。', tags:['事业编','事业单位','考试','时间','笔试']},
    {q:'公务员考什么科目', a:'西藏公务员笔试科目：①行政职业能力测验（行测）150分/120分钟/100题，全部客观题；②申论150分/150分钟，主观题，分A/B/C三类试卷。公安岗加试公安专业科目100分。面试为结构化面试。', tags:['公务员','科目','行测','申论','笔试']},
    {q:'事业编考什么科目', a:'事业单位笔试科目为《职业能力倾向测验》和《综合应用能力》两科，各150分。按岗位分为A类综合管理、B类社会科学、C类自然科学、D类中小学教师、E类医疗卫生、Z类藏医药护理。D类针对教师岗。', tags:['事业编','事业单位','科目','职测','综合应用','D类']},
    {q:'行测有哪些题型', a:'行测150分/120分钟/100题。五大模块：①政治理论+常识35题(35-45分) ②言语理解30题(45-51分) ③数量关系10题(22-25分) ④判断推理35题(40-53分) ⑤资料分析15-20题(约30分)。2025年起新增政治理论模块。', tags:['行测','题型','模块','分值']},
    {q:'申论分几类', a:'申论分三类试卷：A类（市地级以上综合管理）侧重宏观政策分析；B类（县乡级综合管理）聚焦基层治理；C类（行政执法）考查依法行政能力。满分150分，考试时间150分钟。', tags:['申论','分类','A类','B类','C类']},

    // 报名条件
    {q:'报名条件是什么', a:'西藏公务员/事业编基本报名条件：①具有中国国籍 ②年龄18-35周岁（硕士博士放宽至40周岁）③大学专科及以上学历 ④我区生源或符合条件的高校毕业生 ⑤部分岗位要求应届毕业生。具体以公告为准。', tags:['报名','条件','要求','年龄','学历']},
    {q:'西藏生源是什么意思', a:'西藏生源指参加国家统一招生、属西藏生源地的高校毕业生，即高考时户籍在西藏或在西藏参加高考的学生。部分岗位仅限西藏生源报考。', tags:['生源','西藏生源','户籍']},
    {q:'往届生能报吗', a:'可以。西藏公务员和事业编招聘对象包括：①我区生源高校毕业生（含往届）②服务期满的西部计划志愿者、三支一扶人员 ③在藏机关事业单位干部职工配偶及子女 ④大学生退役士兵等。具体以职位表要求为准。', tags:['往届','非应届','社会人员']},

    // 岗位查询
    {q:'汉语言文学能报什么', a:'汉语言文学专业在西藏公考中可报岗位较多：①区直机关文秘岗（纪委监委、政府办公厅等）②中小学语文教师（事业编教育类）③宣传部、文化部门 ④不限专业岗位。建议在岗位查询页搜索"汉语言文学"或"不限"查看具体岗位。', tags:['汉语言文学','专业','中文','语文']},
    {q:'拉萨有哪些岗位', a:'拉萨的岗位主要分布在：①自治区级机关（纪委监委、发改委、教育厅等）②拉萨市直单位 ③城关区、堆龙德庆区等街道/乡镇。您可以在岗位查询页选择"拉萨"筛选查看所有岗位。', tags:['拉萨','岗位','地区']},
    {q:'教师岗有哪些', a:'西藏教师岗位主要分两类：①事业编教育类（中小学教师），2025年招聘535人 ②人才引进（如拉萨中学引进7人）。涵盖语文、数学、英语、物理、化学等学科。在岗位查询页选择"事业编（教育）"类型查看。', tags:['教师','教育','老师','学校']},

    // 分数线
    {q:'教师编分数线多少', a:'2025年西藏教育事业单位笔试最低控制线：教育厅直属学校170分，昌都市160分，退役专项岗位135分。注意：这只是进入面试的最低要求，实际录取分数通常更高。', tags:['教师','分数线','分数','控制线']},
    {q:'事业单位分数线多少', a:'2025年西藏区直事业单位笔试最低控制线为110分。教育事业单位为160-170分（因地区而异）。公务员考试没有统一控制线，按成绩排名确定面试人员。', tags:['事业编','分数线','控制线']},
    {q:'多少分能进面试', a:'进面规则：①公务员按招录人数1:3比例确定面试人员 ②事业单位（需面试岗位）按1:2比例确定 ③硕士及以上岗位按实际报名人数确定。最低控制线上从高分到低分排序。', tags:['面试','进面','比例']},

    // 备考
    {q:'教资好考吗', a:'教师资格证笔试通过率约30%左右。科目二（教育知识与能力）最容易挂科，需要重点背诵。科目一（综合素质）和科目三（学科知识）相对容易。建议备考2-3个月，每天2-3小时。汉语言文学专业考语文教资有专业优势。', tags:['教资','教师资格证','好考','通过率']},
    {q:'行测怎么复习', a:'行测复习建议：①先做一套真题摸底，找出薄弱模块 ②重点突破判断推理和资料分析（提分最快）③数量关系性价比低，建议最后复习 ④政治理论需关注时政和西藏政策 ⑤每天刷题保持手感，考前做全套模拟。', tags:['行测','复习','备考','刷题']},
    {q:'申论怎么复习', a:'申论复习建议：①多读《西藏日报》、政府工作报告积累素材 ②掌握归纳概括、综合分析、对策、大作文四类题型 ③大作文是得分关键（40-50分）④每周练2篇，限时完成 ⑤关注西藏本地热点（乡村振兴、生态保护等）。', tags:['申论','复习','大作文','备考']},
    {q:'备考多久合适', a:'一般建议备考周期：①基础阶段（3-4周）：系统学习各科目知识点 ②强化阶段（2-3周）：专项刷题突破薄弱 ③冲刺阶段（1-2周）：全真模拟+查漏补缺。每天有效学习时间2-4小时，总周期2-3个月为宜。', tags:['备考','时间','多久','周期']},

    // 政策
    {q:'三支一扶是什么', a:'三支一扶指大学生毕业后到基层从事支教、支医、支农和乡村振兴工作。2025年西藏招募1350人。服务期2年，期满后可享受考公加分、定向招录等优惠政策。考试以事业单位笔试成绩为依据，不需单独考试。', tags:['三支一扶','基层','支教','支医']},
    {q:'加分政策有哪些', a:'笔试加分累计不超过15分：①省部级表彰+10分 ②县级先进双联户+5分/地市级+10分/自治区级+15分 ③大学生退役士兵每服役1年+2分（≤4分）④乡村振兴专干每个优秀+3分（≤15分）。各项加分可累计，上限15分。', tags:['加分','政策','优惠']},
    {q:'人才引进是什么', a:'人才引进是西藏面向硕士以上学历人才的招聘渠道，不需参加统一笔试，直接面试。2026年引进计划：拉萨中学7人、政府办公厅6人、政府部门所属事业单位130人、昌都市25人等。要求硕士及以上，部分要求双一流高校。', tags:['人才引进','硕士','博士','免笔试']},

    // 数据
    {q:'数据来源是哪里', a:'本网站数据来源于：①西藏自治区人力资源和社会保障厅官网(hrss.xizang.gov.cn) ②全国人事考试服务平台(zp.cpta.com.cn) ③2026年西藏公务员报名统计数据（官方PDF）。所有数据均标注来源，请以官方公告为准。', tags:['数据','来源','可靠','权威']},
    {q:'数据多久更新', a:'本站数据不定期更新。招考季（1月-6月）更新较频繁，建议同时关注西藏人社厅官网获取最新信息。', tags:['更新','频率','时效']},
    {q:'岗位数据准确吗', a:'2026年公务员岗位数据来自官方PDF报名统计，岗位数、报名人数、竞争比均为真实数据。其他年份部分数据为根据公告估算，仅供参考。建议以西藏人社厅官方公告为准。', tags:['准确','真实','可靠']},

    // 网站
    {q:'怎么用这个网站', a:'①首页：查看统计概览、快速搜索、最新公告 ②岗位查询：按年份/类型/地区/学历/专业等多维度筛选岗位 ③分数线：查看历年笔试分数 ④备考资料：各科目详细备考信息 ⑤考试时间：全年公考时间线。右下角悬浮按钮可随时提问。', tags:['使用','教程','帮助']},
    {q:'怎么对比岗位', a:'在岗位查询页的搜索结果中，勾选想要对比的岗位（最多4个），点击"对比选中"按钮，即可在新页面并排查看各岗位的详细信息。', tags:['对比','比较','岗位']},
  ];

  // ===== 聊天UI =====
  function createUI() {
    // Button
    const btn = document.createElement('div');
    btn.id = 'qa-btn';
    btn.innerHTML = '<i class="fas fa-comment-dots"></i>';
    btn.style.cssText = 'position:fixed;bottom:24px;right:24px;width:56px;height:56px;border-radius:50%;background:var(--primary,#1a6b8a);color:#fff;display:flex;align-items:center;justify-content:center;font-size:24px;cursor:pointer;box-shadow:0 4px 16px rgba(0,0,0,0.2);z-index:9999;transition:transform 0.2s;border:none;';
    btn.onmouseenter = () => btn.style.transform = 'scale(1.1)';
    btn.onmouseleave = () => btn.style.transform = 'scale(1)';
    btn.onclick = toggleChat;
    document.body.appendChild(btn);

    // Dialog
    const dlg = document.createElement('div');
    dlg.id = 'qa-dlg';
    dlg.style.cssText = 'position:fixed;bottom:90px;right:24px;width:340px;height:460px;background:#fff;border-radius:12px;box-shadow:0 4px 24px rgba(0,0,0,0.15);z-index:9998;display:none;flex-direction:column;overflow:hidden;font-size:13px;';
    dlg.innerHTML = `
      <div style="background:var(--primary,#1a6b8a);color:#fff;padding:12px 16px;display:flex;justify-content:space-between;align-items:center;border-radius:12px 12px 0 0;">
        <span style="font-weight:600;"><i class="fas fa-robot"></i> 西藏公考助手</span>
        <span id="qa-close" style="cursor:pointer;font-size:18px;opacity:0.8;">&times;</span>
      </div>
      <div id="qa-msgs" style="flex:1;overflow-y:auto;padding:12px;background:#f7f9fb;">
        <div style="margin-bottom:12px;display:flex;gap:8px;">
          <div style="width:32px;height:32px;border-radius:50%;background:var(--primary,#1a6b8a);color:#fff;display:flex;align-items:center;justify-content:center;font-size:14px;flex-shrink:0;"><i class="fas fa-robot"></i></div>
          <div style="background:#fff;padding:10px 14px;border-radius:12px 12px 12px 0;max-width:80%;box-shadow:0 1px 2px rgba(0,0,0,0.06);line-height:1.6;">你好！我是西藏公考助手，可以回答你关于西藏公务员/事业编考试的问题。比如：<br><br>
          📌 公务员什么时候报名？<br>
          📌 汉语言文学能报什么岗位？<br>
          📌 教师编分数线多少？<br>
          📌 行测怎么复习？<br><br>试试问我吧！</div>
        </div>
      </div>
      <div style="padding:10px 12px;border-top:1px solid #e0e0e0;display:flex;gap:8px;background:#fff;">
        <input id="qa-input" type="text" placeholder="输入您的问题..." style="flex:1;padding:8px 12px;border:1px solid #dce3e8;border-radius:20px;font-size:13px;outline:none;">
        <button id="qa-send" style="width:36px;height:36px;border-radius:50%;background:var(--primary,#1a6b8a);color:#fff;border:none;cursor:pointer;font-size:14px;flex-shrink:0;"><i class="fas fa-paper-plane"></i></button>
      </div>
    `;
    document.body.appendChild(dlg);

    // Events
    document.getElementById('qa-close').onclick = toggleChat;
    document.getElementById('qa-send').onclick = handleSend;
    document.getElementById('qa-input').onkeydown = e => { if(e.key === 'Enter') handleSend(); };
  }

  function toggleChat() {
    const dlg = document.getElementById('qa-dlg');
    const btn = document.getElementById('qa-btn');
    if(dlg.style.display === 'flex') {
      dlg.style.display = 'none';
      btn.innerHTML = '<i class="fas fa-comment-dots"></i>';
    } else {
      dlg.style.display = 'flex';
      btn.innerHTML = '<i class="fas fa-times"></i>';
      document.getElementById('qa-input').focus();
    }
  }

  function handleSend() {
    const input = document.getElementById('qa-input');
    const msg = input.value.trim();
    if(!msg) return;
    input.value = '';

    // Add user message
    addMessage(msg, 'user');

    // Get answer
    setTimeout(() => {
      const answer = getAnswer(msg);
      addMessage(answer, 'bot');
    }, 300);
  }

  function addMessage(text, role) {
    const container = document.getElementById('qa-msgs');
    const div = document.createElement('div');
    div.style.cssText = `margin-bottom:10px;display:flex;gap:8px;${role === 'user' ? 'justify-content:flex-end;' : ''}`;

    if(role === 'bot') {
      div.innerHTML = `<div style="width:32px;height:32px;border-radius:50%;background:var(--primary,#1a6b8a);color:#fff;display:flex;align-items:center;justify-content:center;font-size:14px;flex-shrink:0;"><i class="fas fa-robot"></i></div>
        <div style="background:#fff;padding:10px 14px;border-radius:12px 12px 12px 0;max-width:80%;box-shadow:0 1px 2px rgba(0,0,0,0.06);line-height:1.6;white-space:pre-wrap;">${text}</div>`;
    } else {
      div.innerHTML = `<div style="background:var(--primary,#1a6b8a);color:#fff;padding:10px 14px;border-radius:12px 12px 0 12px;max-width:80%;box-shadow:0 1px 2px rgba(0,0,0,0.06);line-height:1.6;white-space:pre-wrap;">${text}</div>`;
    }
    container.appendChild(div);
    container.scrollTop = container.scrollHeight;
  }

  // ===== 问答匹配引擎 =====
  function getAnswer(input) {
    const lower = input.toLowerCase();

    // 1. Try knowledge base match
    for(const item of KB) {
      const match = item.tags.some(t => lower.includes(t));
      if(match) return item.a;
    }

    // 2. Try data query for positions
    if(lower.includes('岗位') || lower.includes('职位') || lower.includes('招聘') || lower.includes('招录')) {
      return queryPositions(input, lower);
    }

    // 3. Try schedule query
    if(lower.includes('时间') || lower.includes('月份') || lower.includes('几月')) {
      return querySchedule(input, lower);
    }

    // 4. Default response
    return getDefaultResponse(input);
  }

  function queryPositions(input, lower) {
    const conditions = [];
    let typeFilter = null;
    let locFilter = null;

    // Parse type
    if(lower.includes('教师') || lower.includes('教育') || lower.includes('老师')) typeFilter = '事业编（教育）';
    else if(lower.includes('公务员')) typeFilter = '公务员';
    else if(lower.includes('事业')) typeFilter = t => t && t.startsWith('事业编');

    // Parse location
    const locs = ['拉萨','日喀则','昌都','林芝','山南','那曲','阿里'];
    for(const l of locs) {
      if(lower.includes(l)) { locFilter = l; break; }
    }

    const results = POSITIONS_DATA.filter(p => {
      if(typeFilter === '事业编（教育）' && p.type !== '事业编（教育）') return false;
      if(typeFilter === '公务员' && p.type !== '公务员') return false;
      if(locFilter && p.location !== locFilter) return false;
      if(lower.includes('语文') || lower.includes('汉语言')) {
        const major = (p.major || '').toLowerCase();
        const dept = (p.department || '').toLowerCase();
        if(!major.includes('语文') && !major.includes('汉语言') && !dept.includes('语文') && !(p.position || '').toLowerCase().includes('语文')) return false;
      }
      return true;
    }).slice(0, 5);

    if(results.length > 0) {
      let reply = `找到 ${results.length} 个相关岗位（显示前5个）：\n`;
      results.forEach((p, i) => {
        reply += `\n${i+1}. ${p.department} - ${p.position}\n`;
        reply += `   类型:${p.type} | 招${p.recruits}人${p.applicants ? ' | 报'+p.applicants+'人' : ''}${p.ratio ? ' | 竞争比1:'+p.ratio : ''}\n`;
      });
      reply += '\n到岗位查询页查看完整列表 →';
      return reply;
    }

    return null;
  }

  function querySchedule(input, lower) {
    const months = EXAM_SCHEDULE || [];
    if(months.length === 0) return null;

    // Try to find specific month
    for(let m = 1; m <= 12; m++) {
      if(lower.includes(`${m}月`)) {
        const items = months.filter(s => s.month === m);
        if(items.length > 0) {
          let reply = `${m}月的考试安排：\n`;
          items.forEach(s => { reply += `\n• ${s.exam}：${s.event}（${s.year}）\n  ${s.desc || ''}`; });
          return reply;
        }
      }
    }

    // General schedule
    let reply = '全年考试时间安排：\n';
    const seen = new Set();
    months.forEach(s => {
      if(!seen.has(s.exam)) {
        seen.add(s.exam);
        reply += `\n• ${s.month}月 ${s.exam}：${s.event}`;
      }
    });
    reply += '\n\n到考试时间页查看详情 →';
    return reply;
  }

  function getDefaultResponse(input) {
    const lower = input.toLowerCase();

    if(lower.includes('你好') || lower.includes('hi') || lower.includes('hello')) {
      return '你好！有什么关于西藏公考的问题可以问我？比如"公务员什么时候报名"、"汉语言文学能报什么岗位"。';
    }
    if(lower.includes('谢谢') || lower.includes('感谢')) {
      return '不客气！祝您备考顺利，早日上岸！🎉';
    }

    // Generate suggestions based on keywords
    let suggestions = [];
    if(lower.includes('公务员')) suggestions = ['公务员什么时候报名','公务员考什么科目','报名条件是什么'];
    else if(lower.includes('教师') || lower.includes('教资') || lower.includes('教育')) suggestions = ['教师编分数线多少','教资好考吗','教师岗有哪些'];
    else if(lower.includes('行测') || lower.includes('申论')) suggestions = ['行测有哪些题型','申论分几类','行测怎么复习'];
    else if(lower.includes('拉萨') || lower.includes('地区') || lower.includes('地点')) suggestions = ['拉萨有哪些岗位','汉语言文学能报什么','教师岗有哪些'];
    else suggestions = ['公务员什么时候报名','汉语言文学能报什么岗位','行测怎么复习','三支一扶是什么'];

    let reply = '我没有完全理解您的问题，不过您可以试试问：\n';
    suggestions.forEach(s => { reply += `\n• ${s}`; });
    reply += '\n\n或者换个方式描述您的问题。';
    return reply;
  }

  // ===== 初始化 =====
  if(document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', createUI);
  } else {
    createUI();
  }
})();
