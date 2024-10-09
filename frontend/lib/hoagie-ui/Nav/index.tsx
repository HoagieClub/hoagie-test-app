'use client';

import {
  majorScale,
  Pane,
  Text,
  Position,
  Popover,
  Avatar,
  TabNavigation,
  Tab,
  useTheme,
} from 'evergreen-ui';
import { ComponentType } from 'react';
import Link from 'next/link';
import { useRouter, usePathname } from 'next/navigation';
import ProfileCard from '../ProfileCard';

type NavProps = {
  /**
   * The name of the app for generating the `hoagie{name}` title.
   */
  name: string;

  /**
   * A custom component to be used in place of the hoagie logo.
   */
  LogoComponent?: ComponentType;

  /**
   * A custom component to be used in place of the header color strip.
   */
  HeaderComponent?: ComponentType;

  /**
   * A list of tab objects for the navbar, each with `title` and `href` fields.
   */
  tabs?: Array<any>;

  /**
   * Authenticated user data.
   */
  user?: any;

  /**
   * A flag to show the "beta" development disclaimer on the hoagie app logo.
   */
  beta?: boolean;
};

/**
 * Nav is a navbar meant for internal navigations throughout
 * different Hoagie applications.
 */
function Nav({ name, LogoComponent, HeaderComponent, tabs = [], user, beta = false }: NavProps) {
  const theme = useTheme();
  const router = useRouter();
  const pathname = usePathname();
  const uName = user?.isLoading ? 'Tammy Tiger' : (user?.user?.name ?? 'Tammy Tiger');

  return (
    <Pane elevation={1}>
      {HeaderComponent ? (
        <HeaderComponent />
      ) : (
        <Pane width='100%' height={20} background='blue500' />
      )}
      <Pane
        display='flex'
        justifyContent='center'
        width='100%'
        height={majorScale(9)}
        background='white'
      >
        <Pane
          display='flex'
          alignItems='center'
          justifyContent='space-between'
          width='100%'
          height='100%'
          maxWidth={1200}
          paddingX={majorScale(5)}
          fontSize={25}
        >
          <Link href='/'>
            <Pane cursor='pointer' position='relative'>
              {LogoComponent ? (
                <LogoComponent />
              ) : (
                <Pane>
                  <Text is='h2' display='inline-block' className='hoagie logo' color='grey900'>
                    hoagie
                  </Text>
                  <Text is='h2' display='inline-block' className='hoagie logo' color='blue500'>
                    {name}
                  </Text>
                  {beta && (
                    <Text className='hoagie beta' position='absolute' color='grey900'>
                      (BETA)
                    </Text>
                  )}
                </Pane>
              )}
            </Pane>
          </Link>
          <Pane display='flex' alignItems='center'>
            <TabNavigation>
              {tabs.map((tab) => (
                <Tab
                  key={tab.title} // Key moved to the Tab component
                  id={tab.title}
                  isSelected={pathname === tab.href}
                  appearance='primary'
                  onSelect={() => router.push(tab.href)} // Use onSelect for navigation
                >
                  {tab.title}
                </Tab>
              ))}
            </TabNavigation>
            {user?.user && (
              <Popover content={<ProfileCard user={user} />} position={Position.BOTTOM}>
                <Avatar
                  name={uName}
                  style={{ cursor: 'pointer' }}
                  color={theme.title}
                  size={40}
                  marginLeft={majorScale(4)}
                />
              </Popover>
            )}
          </Pane>
        </Pane>
      </Pane>
    </Pane>
  );
}

export default Nav;