import { motion } from 'framer-motion'
import { useAtom, useSetAtom } from 'jotai'
import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import allInOneIcon from '~assets/all-in-one.svg'
import collapseIcon from '~/assets/icons/collapse.svg'
import minimalLogo from '~/assets/mc-logo-mini.svg'
import logo from '~/assets/mc-logo.png'
import { cx } from '~/utils'
import { useEnabledBots } from '~app/hooks/use-enabled-bots'

import { releaseNotesAtom,sidebarCollapsedAtom } from '~app/state'

import { checkReleaseNotes } from '~services/release-notes'
import Tooltip from '../Tooltip'
import NavLink from './NavLink'

function IconButton(props: { icon: string; onClick?: () => void }) {
  return (
    <div
      className="p-[6px] rounded-[10px] w-fit cursor-pointer hover:opacity-80 bg-secondary bg-opacity-20"
      onClick={props.onClick}
    >
      <img src={props.icon} className="w-6 h-6" />
    </div>
  )
}

function Sidebar() {
    const { t } = useTranslation()
    const [collapsed, setCollapsed] = useAtom(sidebarCollapsedAtom)

    const enabledBots = useEnabledBots()
    const setReleaseNotes = useSetAtom(releaseNotesAtom)

    useEffect(() => {
        Promise.all([checkReleaseNotes()]).then(
            async ([releaseNotes]) => {
                setReleaseNotes(releaseNotes)
            },
        )
    }, [])

  return (
    <motion.aside
      className={cx(
        'flex flex-col bg-primary-background bg-opacity-40 overflow-hidden',
        collapsed ? 'items-center px-[15px]' : 'w-[230px] px-4',
      )}
    >
      <div className={cx('flex mt-8 gap-3 items-center', collapsed ? 'flex-col-reverse' : 'flex-row justify-between')}>
        {collapsed ? <img src={minimalLogo} className="w-[30px]" /> : <img src={logo} className="w-[100px] ml-2" />}
        <motion.img
          src={collapseIcon}
          className={cx('w-6 h-6 cursor-pointer')}
          animate={{ rotate: collapsed ? 180 : 0 }}
          onClick={() => setCollapsed((c) => !c)}
        />
      </div>
      <div className="flex flex-col gap-[13px] mt-10 overflow-y-auto scrollbar-none">
        <NavLink to="/" text={'MultiChat'} icon={allInOneIcon} iconOnly={collapsed} />
        {enabledBots.map(({ botId, bot }) => (
          <NavLink
            key={botId}
            to="/chat/$botId"
            params={{ botId }}
            text={bot.name}
            icon={bot.avatar}
            iconOnly={collapsed}
          />
        ))}
      </div>

    </motion.aside>
  )
}

export default Sidebar
