import { useEffect, useMemo, useState } from 'react';
import { useRouter } from 'next/router';
import { Layout, Row, Col, Menu, Dropdown, Popover } from 'antd';

import styles from './Header.module.scss';
import { BarsOutlined } from '@ant-design/icons';

type HeaderProps = {
  activeKey?: string;
  activeIndex?: number;
  isMobile?: boolean;
  routes?: Array<{label, key, url, target?}>,
  injected?: any,
};

export default function Header(props: HeaderProps) {
  const isDesktopOrLaptop = useMemo(()=>{
    return !props?.isMobile;
  }, [props])
  const { Header } = Layout;
  const router = useRouter();

  const menuItems = props?.routes || [
    {
      label: 'SWAP',
      key: 'swap',
      url: 'https://app.weswap.io',
      target: '_self',
    },
    {
      label: 'API',
      key: 'api',
      url: 'https://app.weswap.io/api-integration',
      target: '_self',
    },
    {
      label: 'DOCS',
      key: 'docs',
      url: 'https://docs.weswap.io/',
      target: '_blank',
    },
    {
      label: 'BRIDGE',
      key: 'bridge',
      url: 'https://app.weswap.io/bridge',
      target: '_self',
    },
  ];

  let activeTabIndex = useMemo(() => {
    let index = (
      props?.activeIndex ||
      (props.activeKey &&
        menuItems.findIndex((item) => item.key === props.activeKey))
    );
    return index;
  }, [router]);

  const menu = (
    <Menu style={{ }}>
      <div className={[].join(' ')}>
        {menuItems.map((item, index) => {
          return (
            <a href={item.url}>
              <div
                className={[
                  styles.button,
                  styles['menu-item'],
                  activeTabIndex == index ? styles['active'] : '',
                ].join(' ')}
              >
                {item.label}
              </div>
            </a>
          );
        })}
      </div>
    </Menu>
  );

  return (
    <Header className={styles.header}>
      <Row className={styles['main-content']} justify="space-between" wrap={false}>
        <Row justify="space-between" align="middle">
          {/* logo */}
          <a href="https://www.weswap.io">
            <div className={styles['logo']} style={{ cursor: 'pointer' }}>
              <div className={styles['app-name']}>
                <i
                  className={styles['icon-image']}
                  style={{ verticalAlign: 'middle'}}
                />
                <i
                  className={styles['icon-text']}
                  style={{ verticalAlign: 'middle'}}
                />
              </div>
            </div>
          </a>
          {isDesktopOrLaptop ? (
            <Row
              className={styles.menu}
              key="desktop"
              justify="space-between"
              align="middle"
            >
              <Col flex={1}>
                <Row>
                  {menuItems.map((item, index) => {
                    return (
                      <a href={item.url} target={item?.target}>
                        <div
                          className={[
                            styles.button,
                            activeTabIndex == index ? styles['active'] : '',
                          ].join(' ')}
                        >
                          {item.label}
                        </div>
                      </a>
                    );
                  })}
                </Row>
              </Col>
            </Row>
          ) : (
            <></>
          )}
        </Row>
        <div>
          {isDesktopOrLaptop ? (
            <Row
              className={styles['right-menu']}
              key="desktop"
              justify="space-between"
              align="middle"
              wrap={false}
            >
              {props?.injected ? props?.injected : <></>}
            </Row>
          ) : (
            <>
              <Row
                justify="end"
                align="middle"
                wrap={false}
                style={{ width: '100%', height: '100%', whiteSpace:'nowrap' }}
              >
                {props?.injected ? props?.injected : <></>}
                <div
                  className={styles['mobile-button']}
                >
                  <Popover content={menu}>
                    <BarsOutlined style={{color: '#B362FF', fontSize:'22px', lineHeight:'32px'}}></BarsOutlined>
                  </Popover>
                </div>
              </Row>
            </>
          )}
        </div>
      </Row>
    </Header>
  );
}
