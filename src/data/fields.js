export const fields = {
    name: {id: 'name', offset: 0x0000, size: 16, type: 'char', tab: 'general', label: 'Name'},
    name2: {id: 'name2', offset: 0x0010, size: 16, type: 'char', tab: 'general', label: 'Name'},
    // nitems: {id: 'nitems', offset: 0x0020, size: 1, type: 'int', tab: 'general', label: 'Number of items in inventory'},
    type: {id: 'type', offset: 0x0021, size: 1, type: 'int', tab: 'general', label: 'Archetype'},
    gender: {id: 'gender', offset: 0x0022, size: 1, type: 'int', tab: 'general', label: 'Gender'},
    height: {id: 'height', offset: 0x0023, size: 1, type: 'uint', tab: 'general', label: 'Height (cm)'},
    weight: {id: 'weight', offset: 0x0024, size: 2, type: 'int', tab: 'general', label: 'Weight (oz)'},
    god: {id: 'god', offset: 0x0026, size: 1, type: 'int', tab: 'general', label: 'God'},
    level: {id: 'level', offset: 0x0027, size: 1, type: 'int', tab: 'general', label: 'Level'},
    xp: {id: 'xp', offset: 0x0028, size: 4, type: 'int', tab: 'general', label: 'Experience'},
    money: {id: 'money', offset: 0x002c, size: 4, type: 'int', tab: 'general', label: 'Money'},

    arc1: {id: 'arc1', offset: 0x0030, size: 1, type: 'int', tab: 'general', label: 'Armor class'},
    arc2: {id: 'arc2', offset: 0x0031, size: 1, type: 'int', tab: 'general', label: 'Armor class (bonus)'},
    dmp: {id: 'dmp', offset: 0x0032, size: 1, type: 'int', tab: 'general', label: 'Damage protection'},
    apd: {id: 'apd', offset: 0x0033, size: 1, type: 'int', tab: 'general', label: 'AT/PA deduction'},

    cr: {id: 'cr', offset: 0x0034, size: 1, type: 'int', tab: '+attr', label: 'Courage'},
    cr2: {id: 'cr2', offset: 0x0035, size: 1, type: 'int', tab: '+attr', label: 'Courage (current)'},
    wd: {id: 'wd', offset: 0x0037, size: 1, type: 'int', tab: '+attr', label: 'Wisdom'},
    wd2: {id: 'wd2', offset: 0x0038, size: 1, type: 'int', tab: '+attr', label: 'Wisdom (current)'},
    ch: {id: 'ch', offset: 0x003a, size: 1, type: 'int', tab: '+attr', label: 'Charisma'},
    ch2: {id: 'ch2', offset: 0x003b, size: 1, type: 'int', tab: '+attr', label: 'Charisma (current)'},
    dx: {id: 'dx', offset: 0x003d, size: 1, type: 'int', tab: '+attr', label: 'Dexterity'},
    dx2: {id: 'dx2', offset: 0x003e, size: 1, type: 'int', tab: '+attr', label: 'Dexterity (current)'},
    ag: {id: 'ag', offset: 0x0040, size: 1, type: 'int', tab: '+attr', label: 'Agility'},
    ag2: {id: 'ag2', offset: 0x0041, size: 1, type: 'int', tab: '+attr', label: 'Agility (current)'},
    in: {id: 'in', offset: 0x0043, size: 1, type: 'int', tab: '+attr', label: 'Intuition'},
    in2: {id: 'in2', offset: 0x0044, size: 1, type: 'int', tab: '+attr', label: 'Intuition (current)'},
    st: {id: 'st', offset: 0x0046, size: 1, type: 'int', tab: '+attr', label: 'Strength'},
    st2: {id: 'st2', offset: 0x0047, size: 1, type: 'int', tab: '+attr', label: 'Strength (current)'},

    sn: {id: 'sn', offset: 0x0049, size: 1, type: 'int', tab: '-attr', label: 'Superstition'},
    sn2: {id: 'sn2', offset: 0x0050, size: 1, type: 'int', tab: '-attr', label: 'Superstition (current)'},
    ac: {id: 'ac', offset: 0x004c, size: 1, type: 'int', tab: '-attr', label: 'Acrophobia'},
    ac2: {id: 'ac2', offset: 0x004d, size: 1, type: 'int', tab: '-attr', label: 'Acrophobia (current)'},
    cl: {id: 'cl', offset: 0x004f, size: 1, type: 'int', tab: '-attr', label: 'Claustrophobia'},
    cl2: {id: 'cl2', offset: 0x0050, size: 1, type: 'int', tab: '-attr', label: 'Claustrophobia (current)'},
    av: {id: 'av', offset: 0x0052, size: 1, type: 'int', tab: '-attr', label: 'Avarice'},
    av2: {id: 'av2', offset: 0x0053, size: 1, type: 'int', tab: '-attr', label: 'Avarice (current)'},
    ne: {id: 'ne', offset: 0x0055, size: 1, type: 'int', tab: '-attr', label: 'Necrophobia'},
    ne2: {id: 'ne2', offset: 0x0056, size: 1, type: 'int', tab: '-attr', label: 'Necrophobia (current)'},
    cu: {id: 'cu', offset: 0x0058, size: 1, type: 'int', tab: '-attr', label: 'Curiosity'},
    cu2: {id: 'cu2', offset: 0x0059, size: 1, type: 'int', tab: '-attr', label: 'Curiosity (current)'},
    vt: {id: 'vt', offset: 0x005b, size: 1, type: 'int', tab: '-attr', label: 'Violent temper'},
    vt2: {id: 'vt2', offset: 0x005c, size: 1, type: 'int', tab: '-attr', label: 'Violent temper (current)'},

    lp1: {id: 'lp1', offset: 0x005e, size: 2, type: 'int', tab: 'general', label: 'Life points'},
    lp2: {id: 'lp2', offset: 0x0060, size: 2, type: 'int', tab: 'general', label: 'Life points (current)'},
    ap1: {id: 'ap1', offset: 0x0062, size: 2, type: 'int', tab: 'general', label: 'Astral points'},
    ap2: {id: 'ap2', offset: 0x0064, size: 2, type: 'int', tab: 'general', label: 'Astral points (current)'},
    mr: {id: 'mr', offset: 0x0066, size: 1, type: 'int', tab: 'general', label: 'Magic resistance'},
    atpa: {id: 'atpa', offset: 0x0067, size: 1, type: 'int', tab: 'general', label: 'AT/PA (base)'},

    atun: {id: 'atun', offset: 0x0068, size: 1, type: 'int', tab: 'attack', label: 'AT Unarmed'},
    atcu: {id: 'atcu', offset: 0x0069, size: 1, type: 'int', tab: 'attack', label: 'AT Cutting'},
    atpt: {id: 'atpt', offset: 0x006a, size: 1, type: 'int', tab: 'attack', label: 'AT Pointed'},
    atsw: {id: 'atsw', offset: 0x006b, size: 1, type: 'int', tab: 'attack', label: 'AT Swords'},
    atax: {id: 'atax', offset: 0x006c, size: 1, type: 'int', tab: 'attack', label: 'AT Axes'},
    atpl: {id: 'atpl', offset: 0x006d, size: 1, type: 'int', tab: 'attack', label: 'AT Pole arms'},
    at2h: {id: 'at2h', offset: 0x006e, size: 1, type: 'int', tab: 'attack', label: 'AT Two-handed'},

    paun: {id: 'paun', offset: 0x006f, size: 1, type: 'int', tab: 'parry', label: 'PR Unarmed'},
    pacu: {id: 'pacu', offset: 0x0070, size: 1, type: 'int', tab: 'parry', label: 'PR Cutting'},
    papt: {id: 'papt', offset: 0x0071, size: 1, type: 'int', tab: 'parry', label: 'PR Pointed'},
    pasw: {id: 'pasw', offset: 0x0072, size: 1, type: 'int', tab: 'parry', label: 'PR Swords'},
    paax: {id: 'paax', offset: 0x0073, size: 1, type: 'int', tab: 'parry', label: 'PR Axes'},
    papl: {id: 'papl', offset: 0x0074, size: 1, type: 'int', tab: 'parry', label: 'PR Pole arms'},
    pa2h: {id: 'pa2h', offset: 0x0075, size: 1, type: 'int', tab: 'parry', label: 'PR Two-handed'},

    // alive: {id: 'alive', offset: 0x0080, size: 1, type: 'bool', tab: 'alive', label: 'Alive'},

    cmun: {id: 'cmun', offset: 0x0108, size: 1, type: 'int', tab: 'combat', label: 'Unarmed'},
    cmcu: {id: 'cmcu', offset: 0x0109, size: 1, type: 'int', tab: 'combat', label: 'Cutting'},
    cmpt: {id: 'cmpt', offset: 0x010a, size: 1, type: 'int', tab: 'combat', label: 'Pointed'},
    cmsw: {id: 'cmsw', offset: 0x010b, size: 1, type: 'int', tab: 'combat', label: 'Swords'},
    cmax: {id: 'cmax', offset: 0x010c, size: 1, type: 'int', tab: 'combat', label: 'Axes'},
    cmpl: {id: 'cmpl', offset: 0x010d, size: 1, type: 'int', tab: 'combat', label: 'Pole arms'},
    cm2h: {id: 'cm2h', offset: 0x010e, size: 1, type: 'int', tab: 'combat', label: 'Two-handed'},
    cmms: {id: 'cmms', offset: 0x010f, size: 1, type: 'int', tab: 'combat', label: 'Missile'},
    cmth: {id: 'cmth', offset: 0x0110, size: 1, type: 'int', tab: 'combat', label: 'Thrown'},

    acro: {id: 'acro', offset: 0x0111, size: 1, type: 'int', tab: 'body', label: 'Acrobatics'},
    clim: {id: 'clim', offset: 0x0112, size: 1, type: 'int', tab: 'body', label: 'Climb'},
    phys: {id: 'phys', offset: 0x0113, size: 1, type: 'int', tab: 'body', label: 'Physical control'},
    ride: {id: 'ride', offset: 0x0114, size: 1, type: 'int', tab: 'body', label: 'Ride'},
    stea: {id: 'stea', offset: 0x0115, size: 1, type: 'int', tab: 'body', label: 'Stealth'},
    swim: {id: 'swim', offset: 0x0116, size: 1, type: 'int', tab: 'body', label: 'Swim'},
    self: {id: 'self', offset: 0x0117, size: 1, type: 'int', tab: 'body', label: 'Self control'},
    danc: {id: 'danc', offset: 0x0118, size: 1, type: 'int', tab: 'body', label: 'Dance'},
    hide: {id: 'hide', offset: 0x0119, size: 1, type: 'int', tab: 'body', label: 'Hide'},
    caro: {id: 'caro', offset: 0x011a, size: 1, type: 'int', tab: 'body', label: 'Carouse'},

    conv: {id: 'conv', offset: 0x011b, size: 1, type: 'int', tab: 'social', label: 'Convert'},
    sedu: {id: 'sedu', offset: 0x011c, size: 1, type: 'int', tab: 'social', label: 'Seduce'},
    hagg: {id: 'hagg', offset: 0x011d, size: 1, type: 'int', tab: 'social', label: 'Haggle'},
    stre: {id: 'stre', offset: 0x011e, size: 1, type: 'int', tab: 'social', label: 'Streetwise'},
    liee: {id: 'liee', offset: 0x011f, size: 1, type: 'int', tab: 'social', label: 'Lie'},
    huma: {id: 'huma', offset: 0x0120, size: 1, type: 'int', tab: 'social', label: 'Human nature'},
    eval: {id: 'eval', offset: 0x0121, size: 1, type: 'int', tab: 'social', label: 'Evaluate'},

    trac: {id: 'trac', offset: 0x0122, size: 1, type: 'int', tab: 'nature', label: 'Track'},
    bind: {id: 'bind', offset: 0x0123, size: 1, type: 'int', tab: 'nature', label: 'Bind'},
    orie: {id: 'orie', offset: 0x0124, size: 1, type: 'int', tab: 'nature', label: 'Orientation'},
    herb: {id: 'herb', offset: 0x0125, size: 1, type: 'int', tab: 'nature', label: 'Herb lore'},
    anim: {id: 'anim', offset: 0x0126, size: 1, type: 'int', tab: 'nature', label: 'Animal lore'},
    surv: {id: 'surv', offset: 0x0127, size: 1, type: 'int', tab: 'nature', label: 'Survival'},

    alch: {id: 'alch', offset: 0x0128, size: 1, type: 'int', tab: 'lore', label: 'Alchemy'},
    anct: {id: 'anct', offset: 0x0129, size: 1, type: 'int', tab: 'lore', label: 'Ancient tongues'},
    geog: {id: 'geog', offset: 0x012a, size: 1, type: 'int', tab: 'lore', label: 'Geography'},
    hist: {id: 'hist', offset: 0x012b, size: 1, type: 'int', tab: 'lore', label: 'History'},
    ritu: {id: 'ritu', offset: 0x012c, size: 1, type: 'int', tab: 'lore', label: 'Ritual'},
    tact: {id: 'tact', offset: 0x012d, size: 1, type: 'int', tab: 'lore', label: 'Tactics'},
    read: {id: 'read', offset: 0x012e, size: 1, type: 'int', tab: 'lore', label: 'Read/write'},
    arca: {id: 'arca', offset: 0x012f, size: 1, type: 'int', tab: 'lore', label: 'Arcane lore'},
    tong: {id: 'tong', offset: 0x0130, size: 1, type: 'int', tab: 'lore', label: 'Tongues'},

    trai: {id: 'trai', offset: 0x0131, size: 1, type: 'int', tab: 'craftsmanship', label: 'Train animals'},
    driv: {id: 'driv', offset: 0x0132, size: 1, type: 'int', tab: 'craftsmanship', label: 'Drive'},
    chea: {id: 'chea', offset: 0x0133, size: 1, type: 'int', tab: 'craftsmanship', label: 'Cheat'},
    trpo: {id: 'trpo', offset: 0x0134, size: 1, type: 'int', tab: 'craftsmanship', label: 'Treat poison'},
    trdi: {id: 'trdi', offset: 0x0135, size: 1, type: 'int', tab: 'craftsmanship', label: 'Treat disease'},
    trwo: {id: 'trwo', offset: 0x0136, size: 1, type: 'int', tab: 'craftsmanship', label: 'Treat wounds'},
    intr: {id: 'intr', offset: 0x0137, size: 1, type: 'int', tab: 'craftsmanship', label: 'Instruments'},
    lock: {id: 'lock', offset: 0x0138, size: 1, type: 'int', tab: 'craftsmanship', label: 'Locks'},
    pick: {id: 'pick', offset: 0x0139, size: 1, type: 'int', tab: 'craftsmanship', label: 'Pickpocket'},

    dang: {id: 'dang', offset: 0x013a, size: 1, type: 'int', tab: 'intuition', label: 'Danger sense'},
    perc: {id: 'perc', offset: 0x013b, size: 1, type: 'int', tab: 'intuition', label: 'Perception'},

    att1: {id: 'att1', offset: 0x013c, size: 1, type: 'int', tab: 'skills', label: 'Skill increase attempts left'},

    domi: {id: 'domi', offset: 0x013e, size: 1, type: 'int', tab: 'spell_dispell', label: 'Domination dispell'},
    dest: {id: 'dest', offset: 0x013f, size: 1, type: 'int', tab: 'spell_dispell', label: 'Destructibo arcanite'},
    gard: {id: 'gard', offset: 0x0140, size: 1, type: 'int', tab: 'spell_dispell', label: 'Gardianum paradee'},
    illu: {id: 'illu', offset: 0x0141, size: 1, type: 'int', tab: 'spell_dispell', label: 'Illusions begone'},
    tran: {id: 'tran', offset: 0x0142, size: 1, type: 'int', tab: 'spell_dispell', label: 'Transformation dispell'},

    baac: {id: 'baac', offset: 0x0143, size: 1, type: 'int', tab: 'spell_domination', label: 'Ball and chain'},
    bamb: {id: 'bamb', offset: 0x0144, size: 1, type: 'int', tab: 'spell_domination', label: 'Bambaladam'},
    evil: {id: 'evil', offset: 0x0145, size: 1, type: 'int', tab: 'spell_domination', label: 'Evil eye'},
    grea: {id: 'grea', offset: 0x0146, size: 1, type: 'int', tab: 'spell_domination', label: 'Great need'},
    conf: {id: 'conf', offset: 0x0147, size: 1, type: 'int', tab: 'spell_domination', label: 'Confusion'},
    masa: {id: 'masa', offset: 0x0148, size: 1, type: 'int', tab: 'spell_domination', label: 'Master animals'},
    horr: {id: 'horr', offset: 0x0149, size: 1, type: 'int', tab: 'spell_domination', label: 'Horriphobus deadly fear'},
    astt: {id: 'astt', offset: 0x014a, size: 1, type: 'int', tab: 'spell_domination', label: 'Astral theft'},
    resp: {id: 'resp', offset: 0x014b, size: 1, type: 'int', tab: 'spell_domination', label: 'Respondami veritu'},
    meek: {id: 'meek', offset: 0x014c, size: 1, type: 'int', tab: 'spell_domination', label: 'Meekness'},
    somn: {id: 'somn', offset: 0x014d, size: 1, type: 'int', tab: 'spell_domination', label: 'Somnigravis thousand sheep'},
    dane: {id: 'dane', offset: 0x014e, size: 1, type: 'int', tab: 'spell_domination', label: 'Dance!'},

    bloo: {id: 'bloo', offset: 0x014f, size: 1, type: 'int', tab: 'spell_demonology', label: 'Blood and furor, deadly fate'},
    bani: {id: 'bani', offset: 0x0150, size: 1, type: 'int', tab: 'spell_demonology', label: 'Banish spirits'},
    cons: {id: 'cons', offset: 0x0151, size: 1, type: 'int', tab: 'spell_demonology', label: 'Conjure spirits'},
    hept: {id: 'hept', offset: 0x0152, size: 1, type: 'int', tab: 'spell_demonology', label: 'Heptagon and eye of toad'},
    summ: {id: 'summ', offset: 0x0153, size: 1, type: 'int', tab: 'spell_demonology', label: 'Summon crows'},
    skel: {id: 'skel', offset: 0x0154, size: 1, type: 'int', tab: 'spell_demonology', label: 'Skeletarius air of doom'},

    cone: {id: 'cone', offset: 0x0155, size: 1, type: 'int', tab: 'spell_elements', label: 'Conjure elemental'},
    nihi: {id: 'nihi', offset: 0x0156, size: 1, type: 'int', tab: 'spell_elements', label: 'Nihilatio graviti'},
    soli: {id: 'soli', offset: 0x0157, size: 1, type: 'int', tab: 'spell_elements', label: 'Solidirid rainbow\'s hue'},

    acce: {id: 'acce', offset: 0x0158, size: 1, type: 'int', tab: 'spell_movement', label: 'Acceleratus speedy steed'},
    fora: {id: 'fora', offset: 0x0159, size: 1, type: 'int', tab: 'spell_movement', label: 'Foramen foraminor'},
    moto: {id: 'moto', offset: 0x015a, size: 1, type: 'int', tab: 'spell_movement', label: 'Motoricus motilitens'},
    wiot: {id: 'wiot', offset: 0x015b, size: 1, type: 'int', tab: 'spell_movement', label: 'Without trace, without track'},
    trvs: {id: 'trvs', offset: 0x015c, size: 1, type: 'int', tab: 'spell_movement', label: 'Transversalis telporti'},
    wali: {id: 'wali', offset: 0x015d, size: 1, type: 'int', tab: 'spell_movement', label: 'Walk on ice, walk on snow'},

    balm: {id: 'balm', offset: 0x015e, size: 1, type: 'int', tab: 'spell_healing', label: 'Balm of Roond'},
    wits: {id: 'wits', offset: 0x015f, size: 1, type: 'int', tab: 'spell_healing', label: 'Witch\'s spit'},
    pure: {id: 'pure', offset: 0x0160, size: 1, type: 'int', tab: 'spell_healing', label: 'Pure and clear, herbal tea'},
    rest: {id: 'rest', offset: 0x0161, size: 1, type: 'int', tab: 'spell_healing', label: 'Rest the body, rest the mind'},
    heaa: {id: 'heaa', offset: 0x0162, size: 1, type: 'int', tab: 'spell_healing', label: 'Heal animal'},

    eagl: {id: 'eagl', offset: 0x0163, size: 1, type: 'int', tab: 'spell_clairvoyance', label: 'Eagle\'s eye and lynx\'s ear'},
    anlz: {id: 'anlz', offset: 0x0164, size: 1, type: 'int', tab: 'spell_clairvoyance', label: 'Analyse all arcane things'},
    attr: {id: 'attr', offset: 0x0165, size: 1, type: 'int', tab: 'spell_clairvoyance', label: 'Attributes revealed be'},
    expo: {id: 'expo', offset: 0x0166, size: 1, type: 'int', tab: 'spell_clairvoyance', label: 'Exposami creatures rife'},
    odem: {id: 'odem', offset: 0x0167, size: 1, type: 'int', tab: 'spell_clairvoyance', label: 'Odem arcanum sensum such'},
    pene: {id: 'pene', offset: 0x0168, size: 1, type: 'int', tab: 'spell_clairvoyance', label: 'Penetrating wood and stone'},
    sens: {id: 'sens', offset: 0x0169, size: 1, type: 'int', tab: 'spell_clairvoyance', label: 'Sensibal - clear and well'},

    cham: {id: 'cham', offset: 0x016a, size: 1, type: 'int', tab: 'spell_illusion', label: 'Chameleony mimicry'},
    dupl: {id: 'dupl', offset: 0x016b, size: 1, type: 'int', tab: 'spell_illusion', label: 'Duplication double me'},
    camo: {id: 'camo', offset: 0x016c, size: 1, type: 'int', tab: 'spell_illusion', label: 'Camouflage'},
    wikn: {id: 'wikn', offset: 0x016d, size: 1, type: 'int', tab: 'spell_illusion', label: 'Witch\'s knot'},

    ligh: {id: 'ligh', offset: 0x016e, size: 1, type: 'int', tab: 'spell_combat', label: 'Lightning find thee'},
    darp: {id: 'darp', offset: 0x016f, size: 1, type: 'int', tab: 'spell_combat', label: 'Ecliptifactus darkness\' power'},
    iron: {id: 'iron', offset: 0x0170, size: 1, type: 'int', tab: 'spell_combat', label: 'Iron rust and rotted wood'},
    fulm: {id: 'fulm', offset: 0x0171, size: 1, type: 'int', tab: 'spell_combat', label: 'Fulminictus thunderbolt'},
    igni: {id: 'igni', offset: 0x0172, size: 1, type: 'int', tab: 'spell_combat', label: 'Ignifaxus lance of fire'},
    plum: {id: 'plum', offset: 0x0173, size: 1, type: 'int', tab: 'spell_combat', label: 'Plumbumbarum brachadead'},
    tebr: {id: 'tebr', offset: 0x0174, size: 1, type: 'int', tab: 'spell_combat', label: 'Terror broom'},
    tepo: {id: 'tepo', offset: 0x0175, size: 1, type: 'int', tab: 'spell_combat', label: 'Terror power, terror might'},
    accu: {id: 'accu', offset: 0x0176, size: 1, type: 'int', tab: 'spell_combat', label: 'Accurate eye and hand'},

    wiey: {id: 'wiey', offset: 0x0177, size: 1, type: 'int', tab: 'spell_communication', label: 'Witch\'s eye'},
    necr: {id: 'necr', offset: 0x0178, size: 1, type: 'int', tab: 'spell_communication', label: 'Necropathia putrid head'},

    eawo: {id: 'eawo', offset: 0x0179, size: 1, type: 'int', tab: 'spell_transformation', label: 'Eagle, wolf and shark'},
    arno: {id: 'arno', offset: 0x017a, size: 1, type: 'int', tab: 'spell_transformation', label: 'Arcano psychostabilur'},
    maar: {id: 'maar', offset: 0x017b, size: 1, type: 'int', tab: 'spell_transformation', label: 'Magic armor'},
    inch: {id: 'inch', offset: 0x017c, size: 1, type: 'int', tab: 'spell_transformation', label: 'Increase charisma'},
    fire: {id: 'fire', offset: 0x017d, size: 1, type: 'int', tab: 'spell_transformation', label: 'Fire\'s bane'},
    indx: {id: 'indx', offset: 0x017e, size: 1, type: 'int', tab: 'spell_transformation', label: 'Increase dexterity'},
    inag: {id: 'inag', offset: 0x017f, size: 1, type: 'int', tab: 'spell_transformation', label: 'Increase agility'},
    inin: {id: 'inin', offset: 0x0180, size: 1, type: 'int', tab: 'spell_transformation', label: 'Increase intuition'},
    inst: {id: 'inst', offset: 0x0181, size: 1, type: 'int', tab: 'spell_transformation', label: 'Increase strength'},
    inwd: {id: 'inwd', offset: 0x0182, size: 1, type: 'int', tab: 'spell_transformation', label: 'Increase wisdom'},
    incr: {id: 'incr', offset: 0x0183, size: 1, type: 'int', tab: 'spell_transformation', label: 'Increase courage'},
    muta: {id: 'muta', offset: 0x0184, size: 1, type: 'int', tab: 'spell_transformation', label: 'Mutabili'},
    para: {id: 'para', offset: 0x0185, size: 1, type: 'int', tab: 'spell_transformation', label: 'Paralyze paralone'},
    salo: {id: 'salo', offset: 0x0186, size: 1, type: 'int', tab: 'spell_transformation', label: 'Salother mutother'},
    ocfl: {id: 'ocfl', offset: 0x0187, size: 1, type: 'int', tab: 'spell_transformation', label: 'Ocean\'s floor, lake and stream'},
    visi: {id: 'visi', offset: 0x0188, size: 1, type: 'int', tab: 'spell_transformation', label: 'Visibli vanitene'},

    abve: {id: 'abve', offset: 0x0189, size: 1, type: 'int', tab: 'spell_transmutation', label: 'Abvenenum bile and rot'},
    aeol: {id: 'aeol', offset: 0x018a, size: 1, type: 'int', tab: 'spell_transmutation', label: 'Aeolitus, come and veer'},
    burn: {id: 'burn', offset: 0x018b, size: 1, type: 'int', tab: 'spell_transmutation', label: 'Burn!'},
    clau: {id: 'clau', offset: 0x018c, size: 1, type: 'int', tab: 'spell_transmutation', label: 'Claudibus clavistibor'},
    dark: {id: 'dark', offset: 0x018d, size: 1, type: 'int', tab: 'spell_transmutation', label: 'Darkness'},
    free: {id: 'free', offset: 0x018e, size: 1, type: 'int', tab: 'spell_transmutation', label: 'Freeze the soft, stop the flow'},
    fiat: {id: 'fiat', offset: 0x018f, size: 1, type: 'int', tab: 'spell_transmutation', label: 'Fiat lux'},
    meso: {id: 'meso', offset: 0x0190, size: 1, type: 'int', tab: 'spell_transmutation', label: 'Melt the solid, flow the hard'},
    sile: {id: 'sile', offset: 0x0191, size: 1, type: 'int', tab: 'spell_transmutation', label: 'Silentium silentill'},
    cast: {id: 'cast', offset: 0x0192, size: 1, type: 'int', tab: 'spell_transmutation', label: 'Calm the storm, still the winds'},

    att2: {id: 'att2', offset: 0x0193, size: 1, type: 'int', tab: 'spells', label: 'Spell increase attempts left'},

    scho: {id: 'scho', offset: 0x0194, size: 1, type: 'int', tab: 'general', label: 'Magic school'},
    // wand: {id: 'wand', offset: 0x0195, size: 1, type: 'int', tab: 'general', label: 'Magic wand level'},

    portrait: {id: 'portrait', offset: 0x02da, size: 1024, type: 'portrait', tab: 'portrait', label: 'Portrait'},
}

/*
 * Notes:
 * - Height is stored centimeters.
 * - Integers are usually little endian.
 * - Attack and Parry values are recalculated when on level up points are assigned to AG, IN or ST.
 * - Each byte in portrait field is a pixel of color in hex format. The complete portrait is 32 x 32 pixels (1024 pixels in total).
 * - Base LP is 25 (19) for Warlock, Mage and Elf; 40 (28) for Dwarf; 30 (1E) for the rest.
 * - Base AP is 30 (1E) or 35 (23) for Magicians, 25 (19) for other Spell Casters and 0 (00) for the rest.
 * - MR = ((CR+WD-2)/3+1)-2xSN)+mod (mod: +3 for elves, +0 for hunters and warriors, -2 for Thorwelians, +2 for the rest)
 * - AT/PA = ((IN-1)+(AG-1)+(ST-1))/5+1
 * - Base attack and MR are not recalculated dynamically.
 * - God bonuses:
 *     Praios: +1 CR
 *     Rondra: +1 Swords (and AT or PA Swords)
 *     Efferd: +1 Swim
 *     Travia: +1 Treat Poison
 *     Boron: +1 Human Nature
 *     Hesinde: +1 Alchemy
 *     Firun: +1 Missile, Track
 *     Tsa: +1 CH
 *     Phex: +1 Stealth, Pickpocket
 *     Peraine: +1 Treat Disease, Treat Wounds
 *     Ingerimm: +1 Tactics
 *     Rahja: +1 Dance, Seduce, Instrument
 *
 * Credits:
 * - ws007 (offsets and notes)
 * - Furiat (offsets corrections and some additions)
 * - https://www.gog.com/forum/realms_of_arkania_series/realms_of_arkania_1_character_mechanics_hex_edit_info
 */
