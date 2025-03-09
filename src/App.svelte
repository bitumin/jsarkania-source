<script>
    import {onMount} from "svelte";
    import {ArkaniaChrHexEditor} from "./lib/ArkaniaChrHexEditor";
    import {genders} from "./data/genders";
    import {types} from "./data/types";
    import {gods} from "./data/gods";
    import {schools} from "./data/schools";
    import {colors} from "./data/colors";
    import Input from "./Input.svelte";
    import Select from "./Select.svelte";

    export let version;

    let fileinput
    let submitButton
    let filename
    let isReady = false
    let isLoading = false
    let hexEditor
    let activeTab = 0
    let downloadLink
    let portrait

    onMount(async () => {
        const file = localStorage.getItem('file')
        if (file === null) {
            return
        }

        isLoading = true

        const uint8array = JSON.parse(file);
        hexEditor = new ArkaniaChrHexEditor(uint8array);

        if (hexEditor.isValidChrFile) {
            filename = localStorage.getItem('filename')
            if (null !== localStorage.getItem('activeTab')) {
                activeTab = parseInt(localStorage.getItem('activeTab'), 10)
            }

            isReady = true
        } else {
            localStorage.removeItem('file');
            localStorage.removeItem('filename')

            isReady = false
        }
        isLoading = false
    });

    const onFileSelected = (e) => {
        if (!e.target.files || !e.target.files[0]) { // No file selected
            isReady = hexEditor && hexEditor.isValidChrFile // Check if we still have a valid file loaded
            return
        }

        isReady = false
        isLoading = true

        const inputFileName = e.target.files[0].name

        const reader = new FileReader()
        reader.readAsArrayBuffer(e.target.files[0])

        reader.onload = e => {
            let res = [];
            // noinspection JSCheckFunctionSignatures
            let uint8array = new Uint8Array(e.target.result);
            for (let i in uint8array) {
                res.push((0 + uint8array[i].toString(16)).slice(-2));
            }

            hexEditor = new ArkaniaChrHexEditor(uint8array);
            if (hexEditor.isValidChrFile) {
                localStorage.setItem('file', JSON.stringify(res))
                localStorage.setItem('filename', inputFileName)

                filename = inputFileName

                isReady = true
            } else {
                localStorage.removeItem('file')
                localStorage.removeItem('filename')

                isReady = false
            }
            isLoading = false
        }
    }

    const onTabClick = (tabIdx) => {
        activeTab = tabIdx
        localStorage.setItem('activeTab', tabIdx)
    }

    const saveChanges = (e) => {
        const formData = new FormData(e.target)
        for (const [fieldName, fieldValue] of formData.entries()) {
            const [fieldName2, characterIdx] = fieldName.split('_')
            const [fieldId, proficiencyIdx] = fieldName2.split('-')
            hexEditor.writeValue(fieldValue, fieldId, parseInt(characterIdx, 10), parseInt(proficiencyIdx, 10))
        }
        const blob = new Blob([hexEditor.exportAsInt8Array()], {type: 'application/octet-stream'});

        downloadLink.download = filename
        downloadLink.href = window.URL.createObjectURL(blob);
        downloadLink.click()
    }

    const clearPortrait = () => {
        portrait.replaceChildren()
    }

    const drawPortrait = (colorValues) => {
        portrait.replaceChildren()
        const child = document.createElement('canvas')
        child.setAttribute("id", "canvas")
        child.setAttribute("height", "96")
        child.setAttribute("width", "96")
        portrait.appendChild(child)
        const canvas = document.getElementById('canvas');
        if (!canvas?.getContext) {
            return;
        }
        const ctx = canvas.getContext('2d');
        let x = 1
        let y = 1
        // let debug = '<table>';
        for (let colorValue of colorValues) {
            // if (x === 1) {
            //     debug += '<tr>'
            // }
            // if (colors[parseInt(colorValue, 16)] !== '') {
            //     debug += '<td style="background:' + colors[parseInt(colorValue, 16)] + ';">'
            // } else {
            //     debug += '<td>'
            // }
            ctx.fillStyle = colors[parseInt(colorValue, 16)]
            ctx.fillRect(x * 3, y * 3, 3, 3)

            // debug += '' + parseInt(colorValue, 16) + '</td>'

            if (x === 32) {
                x = 1
                ++y
                // debug += '</tr>'
            } else {
                ++x;
            }
        }
        // debug += '</table>'
        // console.log(debug)
    }

    $: if (isReady && portrait) {
        drawPortrait(hexEditor.readValue('portrait'))
    }

    $: if (!isReady && portrait) {
        clearPortrait()
    }
</script>

<main>
    <a href="#download" style="display: none;" download bind:this={downloadLink}>Download</a>
    <div class="window-container" style="">
        <div class="window outer-window">
            <div class="title-bar">
                <div class="title-bar-text"><span class="logo"></span> JS Arkania Keeper - Version {version}</div>
                <div class="title-bar-controls">
                    <button aria-label="Minimize"></button>
                    <button aria-label="Maximize"></button>
                    <button aria-label="Close"></button>
                </div>
            </div>
            <div class="toolbar">
                <button disabled>File</button>
                <button disabled>Edit</button>
                <button disabled>View</button>
                <button disabled>Tools</button>
                <button disabled>Settings</button>
                <button disabled>Window</button>
                <button disabled>Help</button>
            </div>
            <div class="toolbar-separator"></div>
            <div class="toolbar icons-toolbar">
                <input style="display: none;" type="file" accept=".CHR" on:change={(e) => onFileSelected(e)} bind:this={fileinput}>
                <button id="file-button" class="open-button" on:click={() => {fileinput?.click()}}></button>
                <button class="save-button" on:click={() => {submitButton?.click()}}></button>
            </div>
            <div class="window-body">
                <div class="outer-inner-window-container inner-window-container">
                    {#if isReady}
                        <div class="window inner-window">
                            <div class="title-bar">
                                <div class="title-bar-text"><span class="logo"></span> {filename}</div>
                                <div class="title-bar-controls">
                                    <button aria-label="Minimize"></button>
                                    <button aria-label="Maximize"></button>
                                    <button aria-label="Close"></button>
                                </div>
                            </div>
                            <div class="window-body">
                                <div class="inner-window-container inner-inner-window-container">
                                    <form action="#" on:submit|preventDefault={saveChanges}>
                                    <div class="character-window">
                                        <div class="portrait-column">
                                            <div class="portrait" bind:this={portrait}></div>
                                        </div>
                                        <div class="tabs-column">
                                            <div class="tabs">
                                                <div class="tab" class:active={activeTab === 0} on:click={() => onTabClick(0)}>Character</div>
                                                <div class="tab" class:active={activeTab === 1} on:click={() => onTabClick(1)}>Attack/Parry</div>
                                                <div class="tab" class:active={activeTab === 2} on:click={() => onTabClick(2)}>Skills</div>
                                                <div class="tab" class:active={activeTab === 3} on:click={() => onTabClick(3)}>Spells 1</div>
                                                <div class="tab" class:active={activeTab === 4} on:click={() => onTabClick(4)}>Spells 2</div>
                                            </div>
                                            <div class="tab-contents">
                                                <div class="tab-content" class:active={activeTab === 0}>
                                                    <div class="abilities-column">
                                                        <div class="abilities-row">
                                                            <Input inpSize={110} lblSize={100} id="name" label={hexEditor?.getLabel('name')} value={hexEditor?.readValue('name')}/>
                                                            <Input inpSize={110} lblSize={100} id="money" label={hexEditor?.getLabel('money')} value={hexEditor?.readValue('money')}/>
                                                        </div>
                                                        <div class="abilities-row">
                                                            <Select lblSize={100} id="type" options={types} label={hexEditor?.getLabel('type')} value={hexEditor?.readValue('type').toString()} />
                                                        </div>
                                                        <div class="abilities-row">
                                                            <Select lblSize={100} id="scho" options={schools} label={hexEditor?.getLabel('scho')} value={hexEditor?.readValue('scho').toString()} />
                                                        </div>
                                                        <div class="abilities-row">
                                                            <Select lblSize={100} id="gender" options={genders} label={hexEditor?.getLabel('gender')} value={hexEditor?.readValue('gender').toString()} />
                                                        </div>
                                                        <div class="abilities-row">
                                                            <Select lblSize={100} id="god" options={gods} label={hexEditor?.getLabel('god')} value={hexEditor?.readValue('god').toString()} />
                                                        </div>
                                                        <div class="abilities-row">
                                                            <Input inpSize={110} lblSize={100} id="height" label={hexEditor?.getLabel('height')} value={hexEditor?.readValue('height')}/>
                                                            <Input inpSize={110} lblSize={100} id="weight" label={hexEditor?.getLabel('weight')} value={hexEditor?.readValue('weight')}/>
                                                        </div>
                                                        <div class="abilities-row">
                                                            <Input inpSize={110} lblSize={100} id="level" label={hexEditor?.getLabel('level')} value={hexEditor?.readValue('level')}/>
                                                            <Input inpSize={110} lblSize={100} id="xp" label={hexEditor?.getLabel('xp')} value={hexEditor?.readValue('xp')}/>
                                                        </div>
                                                        <div class="abilities-row">
                                                            <Input inpSize={110} lblSize={100} id="lp1" label={hexEditor?.getLabel('lp1')} value={hexEditor?.readValue('lp1')}/>
                                                            <Input inpSize={110} lblSize={100} id="ap1" label={hexEditor?.getLabel('ap1')} value={hexEditor?.readValue('ap1')}/>
                                                        </div>
                                                        <div class="abilities-row">
                                                            <Input inpSize={110} lblSize={100} id="lp2" label={hexEditor?.getLabel('lp2')} value={hexEditor?.readValue('lp2')}/>
                                                            <Input inpSize={110} lblSize={100} id="ap2" label={hexEditor?.getLabel('ap2')} value={hexEditor?.readValue('ap2')}/>
                                                        </div>
                                                        <div class="abilities-row">
                                                            <Input inpSize={110} lblSize={100} id="arc1" label={hexEditor?.getLabel('arc1')} value={hexEditor?.readValue('arc1')}/>
                                                        </div>
                                                        <div class="abilities-row">
                                                            <Input inpSize={110} lblSize={100} id="cr" label={hexEditor?.getLabel('cr')} value={hexEditor?.readValue('cr')}/>
                                                            <Input inpSize={110} lblSize={100} id="sn" label={hexEditor?.getLabel('sn')} value={hexEditor?.readValue('sn')}/>
                                                        </div>
                                                        <div class="abilities-row">
                                                            <Input inpSize={110} lblSize={100} id="wd" label={hexEditor?.getLabel('wd')} value={hexEditor?.readValue('wd')}/>
                                                            <Input inpSize={110} lblSize={100} id="ac" label={hexEditor?.getLabel('ac')} value={hexEditor?.readValue('ac')}/>
                                                        </div>
                                                        <div class="abilities-row">
                                                            <Input inpSize={110} lblSize={100} id="ch" label={hexEditor?.getLabel('ch')} value={hexEditor?.readValue('ch')}/>
                                                            <Input inpSize={110} lblSize={100} id="cl" label={hexEditor?.getLabel('cl')} value={hexEditor?.readValue('cl')}/>
                                                        </div>
                                                        <div class="abilities-row">
                                                            <Input inpSize={110} lblSize={100} id="dx" label={hexEditor?.getLabel('dx')} value={hexEditor?.readValue('dx')}/>
                                                            <Input inpSize={110} lblSize={100} id="av" label={hexEditor?.getLabel('av')} value={hexEditor?.readValue('av')}/>
                                                        </div>
                                                        <div class="abilities-row">
                                                            <Input inpSize={110} lblSize={100} id="ag" label={hexEditor?.getLabel('ag')} value={hexEditor?.readValue('ag')}/>
                                                            <Input inpSize={110} lblSize={100} id="ne" label={hexEditor?.getLabel('ne')} value={hexEditor?.readValue('ne')}/>
                                                        </div>
                                                        <div class="abilities-row">
                                                            <Input inpSize={110} lblSize={100} id="in" label={hexEditor?.getLabel('in')} value={hexEditor?.readValue('in')}/>
                                                            <Input inpSize={110} lblSize={100} id="cu" label={hexEditor?.getLabel('cu')} value={hexEditor?.readValue('cu')}/>
                                                        </div>
                                                        <div class="abilities-row">
                                                            <Input inpSize={110} lblSize={100} id="st" label={hexEditor?.getLabel('st')} value={hexEditor?.readValue('st')}/>
                                                            <Input inpSize={110} lblSize={100} id="vt" label={hexEditor?.getLabel('vt')} value={hexEditor?.readValue('vt')}/>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div class="tab-content" class:active={activeTab === 1}>
                                                    <div class="abilities-column">
                                                        <div class="abilities-row">
                                                            <Input inpSize={110} lblSize={80} id="atun" label={hexEditor?.getLabel('atun')} value={hexEditor?.readValue('atun')}/>
                                                            <Input inpSize={110} lblSize={80} id="paun" label={hexEditor?.getLabel('paun')} value={hexEditor?.readValue('paun')}/>
                                                        </div>
                                                        <div class="abilities-row">
                                                            <Input inpSize={110} lblSize={80} id="atcu" label={hexEditor?.getLabel('atcu')} value={hexEditor?.readValue('atcu')}/>
                                                            <Input inpSize={110} lblSize={80} id="pacu" label={hexEditor?.getLabel('pacu')} value={hexEditor?.readValue('pacu')}/>
                                                        </div>
                                                        <div class="abilities-row">
                                                            <Input inpSize={110} lblSize={80} id="atpt" label={hexEditor?.getLabel('atpt')} value={hexEditor?.readValue('atpt')}/>
                                                            <Input inpSize={110} lblSize={80} id="papt" label={hexEditor?.getLabel('papt')} value={hexEditor?.readValue('papt')}/>
                                                        </div>
                                                        <div class="abilities-row">
                                                            <Input inpSize={110} lblSize={80} id="atsw" label={hexEditor?.getLabel('atsw')} value={hexEditor?.readValue('atsw')}/>
                                                            <Input inpSize={110} lblSize={80} id="pasw" label={hexEditor?.getLabel('pasw')} value={hexEditor?.readValue('pasw')}/>
                                                        </div>
                                                        <div class="abilities-row">
                                                            <Input inpSize={110} lblSize={80} id="atax" label={hexEditor?.getLabel('atax')} value={hexEditor?.readValue('atax')}/>
                                                            <Input inpSize={110} lblSize={80} id="paax" label={hexEditor?.getLabel('paax')} value={hexEditor?.readValue('paax')}/>
                                                        </div>
                                                        <div class="abilities-row">
                                                            <Input inpSize={110} lblSize={80} id="atpl" label={hexEditor?.getLabel('atpl')} value={hexEditor?.readValue('atpl')}/>
                                                            <Input inpSize={110} lblSize={80} id="papl" label={hexEditor?.getLabel('papl')} value={hexEditor?.readValue('papl')}/>
                                                        </div>
                                                        <div class="abilities-row">
                                                            <Input inpSize={110} lblSize={80} id="at2h" label={hexEditor?.getLabel('at2h')} value={hexEditor?.readValue('at2h')}/>
                                                            <Input inpSize={110} lblSize={80} id="pa2h" label={hexEditor?.getLabel('pa2h')} value={hexEditor?.readValue('pa2h')}/>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div class="tab-content" class:active={activeTab === 2}>
                                                    <div class="abilities-column">
                                                        <fieldset>
                                                            <legend>Combat</legend>
                                                            <Input lblSize={70} id="cmun" label={hexEditor?.getLabel('cmun')} value={hexEditor?.readValue('cmun')}/>
                                                            <Input lblSize={70} id="cmcu" label={hexEditor?.getLabel('cmcu')} value={hexEditor?.readValue('cmcu')}/>
                                                            <Input lblSize={70} id="cmpt" label={hexEditor?.getLabel('cmpt')} value={hexEditor?.readValue('cmpt')}/>
                                                            <Input lblSize={70} id="cmsw" label={hexEditor?.getLabel('cmsw')} value={hexEditor?.readValue('cmsw')}/>
                                                            <Input lblSize={70} id="cmax" label={hexEditor?.getLabel('cmax')} value={hexEditor?.readValue('cmax')}/>
                                                            <Input lblSize={70} id="cmpl" label={hexEditor?.getLabel('cmpl')} value={hexEditor?.readValue('cmpl')}/>
                                                            <Input lblSize={70} id="cm2h" label={hexEditor?.getLabel('cm2h')} value={hexEditor?.readValue('cm2h')}/>
                                                            <Input lblSize={70} id="cmms" label={hexEditor?.getLabel('cmms')} value={hexEditor?.readValue('cmms')}/>
                                                            <Input lblSize={70} id="cmth" label={hexEditor?.getLabel('cmth')} value={hexEditor?.readValue('cmth')}/>
                                                        </fieldset>
                                                        <fieldset>
                                                            <legend>Body</legend>
                                                            <Input lblSize={70} id="acro" label={hexEditor?.getLabel('acro')} value={hexEditor?.readValue('acro')}/>
                                                            <Input lblSize={70} id="clim" label={hexEditor?.getLabel('clim')} value={hexEditor?.readValue('clim')}/>
                                                            <Input lblSize={70} id="ride" label={hexEditor?.getLabel('ride')} value={hexEditor?.readValue('ride')}/>
                                                            <Input lblSize={70} id="stea" label={hexEditor?.getLabel('stea')} value={hexEditor?.readValue('stea')}/>
                                                            <Input lblSize={73} id="swim" label={hexEditor?.getLabel('swim')} value={hexEditor?.readValue('swim')}/>
                                                            <Input lblSize={70} id="self" label={hexEditor?.getLabel('self')} value={hexEditor?.readValue('self')}/>
                                                            <Input lblSize={70} id="danc" label={hexEditor?.getLabel('danc')} value={hexEditor?.readValue('danc')}/>
                                                            <Input lblSize={70} id="hide" label={hexEditor?.getLabel('hide')} value={hexEditor?.readValue('hide')}/>
                                                            <Input lblSize={70} id="caro" label={hexEditor?.getLabel('caro')} value={hexEditor?.readValue('caro')}/>
                                                            <Input lblSize={70} id="phys" label={hexEditor?.getLabel('phys')} value={hexEditor?.readValue('phys')}/>
                                                        </fieldset>
                                                        <fieldset>
                                                            <legend>Intuitive</legend>
                                                            <Input lblSize={70} id="dang" label={hexEditor?.getLabel('dang')} value={hexEditor?.readValue('dang')}/>
                                                            <Input lblSize={70} id="perc" label={hexEditor?.getLabel('perc')} value={hexEditor?.readValue('perc')}/>
                                                        </fieldset>
                                                        <fieldset>
                                                            <legend>Social</legend>
                                                            <Input lblSize={70} id="conv" label={hexEditor?.getLabel('conv')} value={hexEditor?.readValue('conv')}/>
                                                            <Input lblSize={70} id="sedu" label={hexEditor?.getLabel('sedu')} value={hexEditor?.readValue('sedu')}/>
                                                            <Input lblSize={70} id="hagg" label={hexEditor?.getLabel('hagg')} value={hexEditor?.readValue('hagg')}/>
                                                            <Input lblSize={70} id="stre" label={hexEditor?.getLabel('stre')} value={hexEditor?.readValue('stre')}/>
                                                            <Input lblSize={70} id="liee" label={hexEditor?.getLabel('liee')} value={hexEditor?.readValue('liee')}/>
                                                            <Input lblSize={70} id="eval" label={hexEditor?.getLabel('eval')} value={hexEditor?.readValue('eval')}/>
                                                            <Input lblSize={70} id="huma" label={hexEditor?.getLabel('huma')} value={hexEditor?.readValue('huma')}/>
                                                        </fieldset>
                                                        <fieldset>
                                                            <legend>Nature</legend>
                                                            <Input lblSize={70} id="trac" label={hexEditor?.getLabel('trac')} value={hexEditor?.readValue('trac')}/>
                                                            <Input lblSize={70} id="bind" label={hexEditor?.getLabel('bind')} value={hexEditor?.readValue('bind')}/>
                                                            <Input lblSize={70} id="orie" label={hexEditor?.getLabel('orie')} value={hexEditor?.readValue('orie')}/>
                                                            <Input lblSize={70} id="herb" label={hexEditor?.getLabel('herb')} value={hexEditor?.readValue('herb')}/>
                                                            <Input lblSize={70} id="anim" label={hexEditor?.getLabel('anim')} value={hexEditor?.readValue('anim')}/>
                                                            <Input lblSize={70} id="surv" label={hexEditor?.getLabel('surv')} value={hexEditor?.readValue('surv')}/>
                                                        </fieldset>
                                                        <fieldset>
                                                            <legend>Lore</legend>
                                                            <Input lblSize={70} id="alch" label={hexEditor?.getLabel('alch')} value={hexEditor?.readValue('alch')}/>
                                                            <Input lblSize={70} id="geog" label={hexEditor?.getLabel('geog')} value={hexEditor?.readValue('geog')}/>
                                                            <Input lblSize={70} id="hist" label={hexEditor?.getLabel('hist')} value={hexEditor?.readValue('hist')}/>
                                                            <Input lblSize={77} id="ritu" label={hexEditor?.getLabel('ritu')} value={hexEditor?.readValue('ritu')}/>
                                                            <Input lblSize={70} id="read" label={hexEditor?.getLabel('read')} value={hexEditor?.readValue('read')}/>
                                                            <Input lblSize={70} id="arca" label={hexEditor?.getLabel('arca')} value={hexEditor?.readValue('arca')}/>
                                                            <Input lblSize={70} id="tong" label={hexEditor?.getLabel('tong')} value={hexEditor?.readValue('tong')}/>
                                                            <Input lblSize={70} id="anct" label={hexEditor?.getLabel('anct')} value={hexEditor?.readValue('anct')}/>
                                                            <Input lblSize={70} id="tact" label={hexEditor?.getLabel('tact')} value={hexEditor?.readValue('tact')}/>
                                                        </fieldset>
                                                        <fieldset>
                                                            <legend>Craftsmanship</legend>
                                                            <Input lblSize={70} id="trai" label={hexEditor?.getLabel('trai')} value={hexEditor?.readValue('trai')}/>
                                                            <Input lblSize={70} id="driv" label={hexEditor?.getLabel('driv')} value={hexEditor?.readValue('driv')}/>
                                                            <Input lblSize={70} id="chea" label={hexEditor?.getLabel('chea')} value={hexEditor?.readValue('chea')}/>
                                                            <Input lblSize={70} id="trpo" label={hexEditor?.getLabel('trpo')} value={hexEditor?.readValue('trpo')}/>
                                                            <Input lblSize={70} id="trdi" label={hexEditor?.getLabel('trdi')} value={hexEditor?.readValue('trdi')}/>
                                                            <Input lblSize={70} id="intr" label={hexEditor?.getLabel('intr')} value={hexEditor?.readValue('intr')}/>
                                                            <Input lblSize={70} id="lock" label={hexEditor?.getLabel('lock')} value={hexEditor?.readValue('lock')}/>
                                                            <Input lblSize={70} id="pick" label={hexEditor?.getLabel('pick')} value={hexEditor?.readValue('pick')}/>
                                                            <Input lblSize={70} id="trwo" label={hexEditor?.getLabel('trwo')} value={hexEditor?.readValue('trwo')}/>
                                                        </fieldset>
                                                    </div>
                                                </div>
                                                <div class="tab-content" class:active={activeTab === 3}>
                                                    <div class="abilities-column">
                                                        <fieldset>
                                                            <legend>Dispell</legend>
                                                            <Input lblSize={140} id="domi" label={hexEditor?.getLabel('domi')} value={hexEditor?.readValue('domi')}/>
                                                            <Input lblSize={140} id="dest" label={hexEditor?.getLabel('dest')} value={hexEditor?.readValue('dest')}/>
                                                            <Input lblSize={140} id="gard" label={hexEditor?.getLabel('gard')} value={hexEditor?.readValue('gard')}/>
                                                            <Input lblSize={140} id="illu" label={hexEditor?.getLabel('illu')} value={hexEditor?.readValue('illu')}/>
                                                            <Input lblSize={140} id="tran" label={hexEditor?.getLabel('tran')} value={hexEditor?.readValue('tran')}/>
                                                        </fieldset>
                                                        <fieldset>
                                                            <legend>Domination</legend>
                                                            <Input lblSize={140} id="baac" label={hexEditor?.getLabel('baac')} value={hexEditor?.readValue('baac')}/>
                                                            <Input lblSize={140} id="bamb" label={hexEditor?.getLabel('bamb')} value={hexEditor?.readValue('bamb')}/>
                                                            <Input lblSize={140} id="evil" label={hexEditor?.getLabel('evil')} value={hexEditor?.readValue('evil')}/>
                                                            <Input lblSize={140} id="grea" label={hexEditor?.getLabel('grea')} value={hexEditor?.readValue('grea')}/>
                                                            <Input lblSize={140} id="conf" label={hexEditor?.getLabel('conf')} value={hexEditor?.readValue('conf')}/>
                                                            <Input lblSize={140} id="masa" label={hexEditor?.getLabel('masa')} value={hexEditor?.readValue('masa')}/>
                                                            <Input lblSize={140} id="horr" label={hexEditor?.getLabel('horr')} value={hexEditor?.readValue('horr')}/>
                                                            <Input lblSize={140} id="astt" label={hexEditor?.getLabel('astt')} value={hexEditor?.readValue('astt')}/>
                                                            <Input lblSize={140} id="resp" label={hexEditor?.getLabel('resp')} value={hexEditor?.readValue('resp')}/>
                                                            <Input lblSize={140} id="meek" label={hexEditor?.getLabel('meek')} value={hexEditor?.readValue('meek')}/>
                                                            <Input lblSize={140} id="somn" label={hexEditor?.getLabel('somn')} value={hexEditor?.readValue('somn')}/>
                                                            <Input lblSize={140} id="dane" label={hexEditor?.getLabel('dane')} value={hexEditor?.readValue('dane')}/>
                                                        </fieldset>
                                                        <fieldset>
                                                            <legend>Demonology</legend>
                                                            <Input lblSize={140} id="bloo" label={hexEditor?.getLabel('bloo')} value={hexEditor?.readValue('bloo')}/>
                                                            <Input lblSize={140} id="bani" label={hexEditor?.getLabel('bani')} value={hexEditor?.readValue('bani')}/>
                                                            <Input lblSize={140} id="cons" label={hexEditor?.getLabel('cons')} value={hexEditor?.readValue('cons')}/>
                                                            <Input lblSize={140} id="hept" label={hexEditor?.getLabel('hept')} value={hexEditor?.readValue('hept')}/>
                                                            <Input lblSize={140} id="summ" label={hexEditor?.getLabel('summ')} value={hexEditor?.readValue('summ')}/>
                                                            <Input lblSize={140} id="skel" label={hexEditor?.getLabel('skel')} value={hexEditor?.readValue('skel')}/>
                                                        </fieldset>
                                                        <fieldset>
                                                            <legend>Elements</legend>
                                                            <Input lblSize={140} id="cone" label={hexEditor?.getLabel('cone')} value={hexEditor?.readValue('cone')}/>
                                                            <Input lblSize={140} id="nihi" label={hexEditor?.getLabel('nihi')} value={hexEditor?.readValue('nihi')}/>
                                                            <Input lblSize={140} id="soli" label={hexEditor?.getLabel('soli')} value={hexEditor?.readValue('soli')}/>
                                                        </fieldset>
                                                        <fieldset>
                                                            <legend>Movement</legend>
                                                            <Input lblSize={140} id="acce" label={hexEditor?.getLabel('acce')} value={hexEditor?.readValue('acce')}/>
                                                            <Input lblSize={140} id="fora" label={hexEditor?.getLabel('fora')} value={hexEditor?.readValue('fora')}/>
                                                            <Input lblSize={140} id="moto" label={hexEditor?.getLabel('moto')} value={hexEditor?.readValue('moto')}/>
                                                            <Input lblSize={140} id="trvs" label={hexEditor?.getLabel('trvs')} value={hexEditor?.readValue('trvs')}/>
                                                            <Input lblSize={140} id="wali" label={hexEditor?.getLabel('wali')} value={hexEditor?.readValue('wali')}/>
                                                            <Input lblSize={140} id="wiot" label={hexEditor?.getLabel('wiot')} value={hexEditor?.readValue('wiot')}/>
                                                        </fieldset>
                                                        <fieldset>
                                                            <legend>Healing</legend>
                                                            <Input lblSize={140} id="balm" label={hexEditor?.getLabel('balm')} value={hexEditor?.readValue('balm')}/>
                                                            <Input lblSize={140} id="wits" label={hexEditor?.getLabel('wits')} value={hexEditor?.readValue('wits')}/>
                                                            <Input lblSize={140} id="pure" label={hexEditor?.getLabel('pure')} value={hexEditor?.readValue('pure')}/>
                                                            <Input lblSize={140} id="rest" label={hexEditor?.getLabel('rest')} value={hexEditor?.readValue('rest')}/>
                                                            <Input lblSize={140} id="heaa" label={hexEditor?.getLabel('heaa')} value={hexEditor?.readValue('heaa')}/>
                                                        </fieldset>
                                                        <fieldset>
                                                            <legend>Communication</legend>
                                                            <Input lblSize={140} id="wiey" label={hexEditor?.getLabel('wiey')} value={hexEditor?.readValue('wiey')}/>
                                                            <Input lblSize={140} id="necr" label={hexEditor?.getLabel('necr')} value={hexEditor?.readValue('necr')}/>
                                                        </fieldset>
                                                    </div>
                                                </div>
                                                <div class="tab-content" class:active={activeTab === 4}>
                                                    <div class="abilities-column">
                                                        <fieldset>
                                                            <legend>Clairvoyance</legend>
                                                            <Input lblSize={140} id="eagl" label={hexEditor?.getLabel('eagl')} value={hexEditor?.readValue('eagl')}/>
                                                            <Input lblSize={140} id="anlz" label={hexEditor?.getLabel('anlz')} value={hexEditor?.readValue('anlz')}/>
                                                            <Input lblSize={140} id="attr" label={hexEditor?.getLabel('attr')} value={hexEditor?.readValue('attr')}/>
                                                            <Input lblSize={140} id="expo" label={hexEditor?.getLabel('expo')} value={hexEditor?.readValue('expo')}/>
                                                            <Input lblSize={140} id="odem" label={hexEditor?.getLabel('odem')} value={hexEditor?.readValue('odem')}/>
                                                            <Input lblSize={140} id="pene" label={hexEditor?.getLabel('pene')} value={hexEditor?.readValue('pene')}/>
                                                            <Input lblSize={140} id="sens" label={hexEditor?.getLabel('sens')} value={hexEditor?.readValue('sens')}/>
                                                        </fieldset>
                                                        <fieldset>
                                                            <legend>Illusion</legend>
                                                            <Input lblSize={140} id="cham" label={hexEditor?.getLabel('cham')} value={hexEditor?.readValue('cham')}/>
                                                            <Input lblSize={140} id="dupl" label={hexEditor?.getLabel('dupl')} value={hexEditor?.readValue('dupl')}/>
                                                            <Input lblSize={140} id="camo" label={hexEditor?.getLabel('camo')} value={hexEditor?.readValue('camo')}/>
                                                            <Input lblSize={140} id="wikn" label={hexEditor?.getLabel('wikn')} value={hexEditor?.readValue('wikn')}/>
                                                        </fieldset>
                                                        <fieldset>
                                                            <legend>Combat</legend>
                                                            <Input lblSize={140} id="ligh" label={hexEditor?.getLabel('ligh')} value={hexEditor?.readValue('ligh')}/>
                                                            <Input lblSize={140} id="darp" label={hexEditor?.getLabel('darp')} value={hexEditor?.readValue('darp')}/>
                                                            <Input lblSize={140} id="iron" label={hexEditor?.getLabel('iron')} value={hexEditor?.readValue('iron')}/>
                                                            <Input lblSize={140} id="fulm" label={hexEditor?.getLabel('fulm')} value={hexEditor?.readValue('fulm')}/>
                                                            <Input lblSize={140} id="igni" label={hexEditor?.getLabel('igni')} value={hexEditor?.readValue('igni')}/>
                                                            <Input lblSize={140} id="plum" label={hexEditor?.getLabel('plum')} value={hexEditor?.readValue('plum')}/>
                                                            <Input lblSize={140} id="tebr" label={hexEditor?.getLabel('tebr')} value={hexEditor?.readValue('tebr')}/>
                                                            <Input lblSize={140} id="tepo" label={hexEditor?.getLabel('tepo')} value={hexEditor?.readValue('tepo')}/>
                                                            <Input lblSize={140} id="accu" label={hexEditor?.getLabel('accu')} value={hexEditor?.readValue('accu')}/>
                                                        </fieldset>
                                                        <fieldset>
                                                            <legend>Transformation</legend>
                                                            <Input lblSize={140} id="arno" label={hexEditor?.getLabel('arno')} value={hexEditor?.readValue('arno')}/>
                                                            <Input lblSize={140} id="maar" label={hexEditor?.getLabel('maar')} value={hexEditor?.readValue('maar')}/>
                                                            <Input lblSize={140} id="inch" label={hexEditor?.getLabel('inch')} value={hexEditor?.readValue('inch')}/>
                                                            <Input lblSize={140} id="fire" label={hexEditor?.getLabel('fire')} value={hexEditor?.readValue('fire')}/>
                                                            <Input lblSize={140} id="indx" label={hexEditor?.getLabel('indx')} value={hexEditor?.readValue('indx')}/>
                                                            <Input lblSize={140} id="inag" label={hexEditor?.getLabel('inag')} value={hexEditor?.readValue('inag')}/>
                                                            <Input lblSize={140} id="inin" label={hexEditor?.getLabel('inin')} value={hexEditor?.readValue('inin')}/>
                                                            <Input lblSize={140} id="inst" label={hexEditor?.getLabel('inst')} value={hexEditor?.readValue('inst')}/>
                                                            <Input lblSize={140} id="inwd" label={hexEditor?.getLabel('inwd')} value={hexEditor?.readValue('inwd')}/>
                                                            <Input lblSize={140} id="incr" label={hexEditor?.getLabel('incr')} value={hexEditor?.readValue('incr')}/>
                                                            <Input lblSize={140} id="muta" label={hexEditor?.getLabel('muta')} value={hexEditor?.readValue('muta')}/>
                                                            <Input lblSize={140} id="para" label={hexEditor?.getLabel('para')} value={hexEditor?.readValue('para')}/>
                                                            <Input lblSize={140} id="salo" label={hexEditor?.getLabel('salo')} value={hexEditor?.readValue('salo')}/>
                                                            <Input lblSize={140} id="visi" label={hexEditor?.getLabel('visi')} value={hexEditor?.readValue('visi')}/>
                                                            <Input lblSize={140} id="eawo" label={hexEditor?.getLabel('eawo')} value={hexEditor?.readValue('eawo')}/>
                                                            <Input lblSize={140} id="ocfl" label={hexEditor?.getLabel('ocfl')} value={hexEditor?.readValue('ocfl')}/>
                                                        </fieldset>
                                                        <fieldset>
                                                            <legend>Transmutation</legend>
                                                            <Input lblSize={140} id="abve" label={hexEditor?.getLabel('abve')} value={hexEditor?.readValue('abve')}/>
                                                            <Input lblSize={140} id="aeol" label={hexEditor?.getLabel('aeol')} value={hexEditor?.readValue('aeol')}/>
                                                            <Input lblSize={140} id="burn" label={hexEditor?.getLabel('burn')} value={hexEditor?.readValue('burn')}/>
                                                            <Input lblSize={140} id="clau" label={hexEditor?.getLabel('clau')} value={hexEditor?.readValue('clau')}/>
                                                            <Input lblSize={140} id="dark" label={hexEditor?.getLabel('dark')} value={hexEditor?.readValue('dark')}/>
                                                            <Input lblSize={140} id="free" label={hexEditor?.getLabel('free')} value={hexEditor?.readValue('free')}/>
                                                            <Input lblSize={140} id="fiat" label={hexEditor?.getLabel('fiat')} value={hexEditor?.readValue('fiat')}/>
                                                            <Input lblSize={140} id="meso" label={hexEditor?.getLabel('meso')} value={hexEditor?.readValue('meso')}/>
                                                            <Input lblSize={140} id="sile" label={hexEditor?.getLabel('sile')} value={hexEditor?.readValue('sile')}/>
                                                            <Input lblSize={140} id="cast" label={hexEditor?.getLabel('cast')} value={hexEditor?.readValue('cast')}/>
                                                        </fieldset>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <button style="display: none;" type="submit" bind:this={submitButton}></button>
                                    </form>
                                </div>
                            </div>
                        </div>
                    {/if}
                </div>
            </div>
            <div class="status-bar">
                <div class="status">
                    {#if isLoading}Loading...{:else if isReady}Ready{:else}&nbsp;{/if}
                </div>
            </div>
        </div>
    </div>
</main>

<style>
    .title-bar {
        position: relative;
    }

    .title-bar-text {
        padding-left: 22px;
    }

    .window-container {
        width: 100%;
        text-align: center;
    }

    .logo {
        display: inline-block;
        height: 20px;
        width: 20px;
        background-image: url('/favicon.png');
        background-position: center center;
        background-size: 20px 20px;
        position: absolute;
        top: 0;
        left: 2px;
    }

    .outer-window {
        width: 800px;
        height: 826px;
        display: inline-block;
    }

    .toolbar {
        text-align: left;
        padding-left: 4px;
    }

    .window-body {
        margin: 0;
    }

    .toolbar > button {
        display: inline-block;
        padding: 0 5px;
        box-shadow: none;
        min-width: unset;
    }

    .inner-window-container {
        box-shadow: inset -1px -1px #fff, inset 1px 1px grey, inset -2px -2px #dfdfdf, inset 2px 2px #0a0a0a;
        display: block;
        margin: 0;
        padding: 2px 2px;
    }

    .outer-inner-window-container {
        background: #808080;
        height: 732px;
        text-align: left;
    }

    .inner-window {
        width: 770px;
        height: 720px;
        display: inline-block;
    }

    .inner-inner-window-container {
        height: 695px;
    }

    .status {
        min-height: 23px;
        line-height: 23px;
        padding-left: 4px;
    }

    .character-window {
        padding-top: 8px;
        padding-left: 8px;
    }

    .portrait-column {
        width: 100px;
        display: block;
        float: left;
    }

    .tabs-column {
        display: block;
        float: left;
        height: 687px;
        margin-left: 8px;
        width: 630px;
    }

    .portrait {
        width: 96px;
        height: 96px;
    }

    .tabs {
        display: flex;
        flex-direction: row;
        flex-wrap: nowrap;
        align-content: flex-start;
        justify-content: flex-start;
        align-items: flex-end;
    }

    .tab-contents {
        margin-top: -4px;
        box-shadow: inset -1px -1px #0a0a0a, inset 1px 1px #fff, inset -2px -2px grey, inset 2px 2px #dfdfdf;
        background-color: silver;
        height: 654px;
    }

    .tab {
        position: relative;
        display: inline-block;
        padding: 5px 8px 7px 8px;
        box-shadow: inset -1px -1px #0a0a0a, inset 1px 1px #fff, inset -2px -2px grey, inset 2px 2px #dfdfdf;
        border-radius: 3px 2px 0 0;
        background-color: silver;
        clip-path: inset(0 0 2px 0);
        cursor: default;
        height: 10px;
        margin-left: -2px;
        margin-bottom: 2px;
    }

    .tab:first-child {
        margin-left: 0;
    }

    .tab.active {
        height: 14px;
        margin-bottom: 0;
        z-index: 1;
    }

    .tab-content {
        display: none;
        width: 100%;
        height: 100%;
    }

    .tab-content.active {
        display: block;
    }

    .abilities-column {
        display: block;
        float: left;
        padding: 4px 12px 0 12px;
    }

    .toolbar-separator {
        box-shadow: inset -1px -1px #fff, inset 0 1px grey, inset 1px -2px grey, inset 2px 2px #fff;
        clip-path: inset(0 2px 2px 2px);
        height: 5px;
    }

    .icons-toolbar {
        height: 21px;
    }

    .icons-toolbar button {
        margin-right: 2px;
    }

    .open-button {
        display: inline-block !important;
        float: left;
        height: 24px;
        width: 23px;
        padding: 0 !important;
        background-image: url(/open.png);
        background-position: center center;
        background-size: contain;
        margin-top: -3px;
    }

    .save-button {
        display: inline-block !important;
        float: left;
        height: 24px;
        width: 23px;
        padding: 0 !important;
        background-image: url(/save.png);
        background-position: center center;
        background-size: contain;
        margin-top: -3px;
    }

    fieldset {
        margin-top: 6px;
        padding-block-start: 0;
    }
</style>
