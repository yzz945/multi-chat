import { defineManifest } from '@crxjs/vite-plugin'

export default defineManifest(async () => {
    return {
        manifest_version: 3,
        name: '__MSG_appName__',
        description: '__MSG_appDesc__',
        default_locale: 'zh_CN',
        version: '1.0.1',
        icons: {
            '16': 'src/assets/icon.png',
            '32': 'src/assets/icon.png',
            '48': 'src/assets/icon.png',
            '128': 'src/assets/icon.png',
        },
        background: {
            service_worker: 'src/background/index.ts',
            type: 'module',
        },
        action: {},
        host_permissions: [
            'https://www.baichuan-ai.com',
            'https://tongyi.aliyun.com',
        ],
        optional_host_permissions: ['https://*/*', 'wss://*/*'],
        permissions: ['storage', 'unlimitedStorage', 'sidePanel', 'declarativeNetRequestWithHostAccess', 'scripting'],
        content_scripts: [
        ],
        commands: {
            'open-app': {
                suggested_key: {
                    default: 'Alt+J',
                    windows: 'Alt+J',
                    linux: 'Alt+J',
                    mac: 'Command+J',
                },
                description: 'Open MultiChat app',
            },
        },
        declarative_net_request: {
            rule_resources: [
                {
                    id: 'ruleset_qianwen',
                    enabled: true,
                    path: 'src/rules/qianwen.json',
                },
                {
                    id: 'ruleset_baichuan',
                    enabled: true,
                    path: 'src/rules/baichuan.json',
                }
            ],
        },
    }
})
