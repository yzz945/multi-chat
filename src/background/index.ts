// 兼容各个版本浏览器的库
import Browser from 'webextension-polyfill'
//
import { ALL_IN_ONE_PAGE_ID } from '~app/consts'
// 获取各个AI平台的用户配置信息
import { getUserConfig } from '~services/user-config'
// 通过https://plausible.io/来统计安装的数量
// import { trackInstallSource } from './source'

// expose storage.session to content scripts
// using `chrome.*` API because `setAccessLevel` is not supported by `Browser.*` API
chrome.storage.session.setAccessLevel({ accessLevel: 'TRUSTED_AND_UNTRUSTED_CONTEXTS' })

// 打开页面的url和后缀
async function openAppPage() {
    const tabs = await Browser.tabs.query({})
    const url = Browser.runtime.getURL('app.html')
    const tab = tabs.find((tab) => tab.url?.startsWith(url))
    if (tab) {
        await Browser.tabs.update(tab.id, { active: true })
        return
    }
    const { startupPage } = await getUserConfig()
    const hash = startupPage === ALL_IN_ONE_PAGE_ID ? '' : `#/chat/${startupPage}`
    await Browser.tabs.create({ url: `app.html${hash}` })
}

Browser.action.onClicked.addListener(() => {
    openAppPage()
})

Browser.runtime.onInstalled.addListener((details) => {
    if (details.reason === 'install') {
        Browser.tabs.create({ url: 'app.html#/' })
        // trackInstallSource()
    }
})

Browser.commands.onCommand.addListener(async (command) => {
    console.debug(`Command: ${command}`)
    if (command === 'open-app') {
        openAppPage()
    }
})

Browser.runtime.onMessage.addListener(async (message, sender) => {
    console.debug('onMessage', message, sender)
    if (message.target !== 'background') {
        return
    }
})
