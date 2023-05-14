import styles from './Home.module.scss';
import { Row } from './row';
import { Col } from './col';
import Button from './button';
import AutoFixImage from './auto-fix-image';
import { useResponsive } from './useResponsive';
import { useWalletKit, ConnectButton } from '@mysten/wallet-kit';
import LogoImg from './images/logo.svg';
import { useMotionValueEvent, useScroll } from 'framer-motion';
import React from 'react';
import Router from 'next/router';
import LogoIcon from './images/logo.svg';
import { Drawer, MenuItem } from '@mui/material';
import { openLink } from './util';

export default function Menu() {
  const { isDesktopOrLaptop } = useResponsive();
  const [activeKey, setActiveKey] = React.useState('Home');
  const { scrollYProgress } = useScroll();
  const [openDropdown, setOpenDropdown] = React.useState<boolean>(false);
  const [openKeys, setOpenKeys] = React.useState<string[]>([]);

  useMotionValueEvent(scrollYProgress, 'change', (value) => {
    const scale = value * 100;
    if (scale < 10) {
      setActiveKey('Home');
    } else if (scale < 30) {
      setActiveKey('Games');
    } else if (scale < 40) {
      setActiveKey('Earn');
    } else if (scale < 55) {
      setActiveKey('NFT');
    } else if (scale < 75) {
      setActiveKey('Mission');
    } else if (scale < 100) {
      setActiveKey('Roadmap');
    }
  });

  const menuItems = [
    {
      title: 'Game & Earn',
      text: 'Game & Earn',
      key: 'Game',
      link: 'https://beta.luckystar.homes/games/coinflip',
      onClick: (event) => {
        event?.preventDefault();
        openLink('https://beta.luckystar.homes/games/coinflip');
      },
    },
    {
      title: 'Whitepaper',
      text: 'Whitepaper',
      key: 'Whitepaper',
      link: 'https://docs.luckystar.homes/',
      onClick: (event) => {
        event?.preventDefault();
        openLink('https://docs.luckystar.homes/')
      },
    },
    {
      title: 'Presale',
      text: 'Presale',
      key: 'Presale',
      link: '',
      onClick: (event) => {
        event?.preventDefault();
        openLink('https://www.luckystar.homes/suipresale');
      },
    },
    {
      title: 'IDO',
      text: 'IDO',
      key: 'IDO',
      link: '',
      onClick: (event) => {
        event?.preventDefault();
        openLink('https://www.luckystar.homes/suiido');
      },
    },
  ];

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setOpenDropdown(!openDropdown);
  };
  const handleClose = () => {
    setOpenDropdown(false);
  };

  function onItemClicked(item) {
    if (item.children) {
      if (openKeys.includes(item.key)) {
        setOpenKeys(openKeys.filter((key) => key !== item.key));
      } else {
        setOpenKeys([...openKeys, item.key]);
      }
    } else {
      item.onClick();
      handleClose();
    }
  }

  if (isDesktopOrLaptop) {
    return (
      <div className={styles['menu']}>
        <Row
          justify="space-between"
          align={'center'}
          className={styles['menu-container']}
        >
          <Col>
            <Row align="center">
              <AutoFixImage
                width={40}
                height={40}
                className={styles['logo']}
                src={LogoImg.src}
              ></AutoFixImage>
              <div className={styles['logo-text']}>LuckyStar</div>
            </Row>
          </Col>
          <Col style={{ flexGrow: '1' }}>
            <Row className={styles['routes']} justify={'flex-end'}>
              {menuItems.map((item, index) => {
                return (
                  <a
                    key={index}
                    className={`${styles['route']} ${activeKey === item.key ? styles['route-active'] : ''
                      }`}
                    onClick={item.onClick}
                  >
                    {item.text}
                  </a>
                );
              })}
            </Row>
          </Col>

          <Col>
            <Row spacing={2}>
              <Col>
                <ConnectButton
                  className={styles['connect-button']}
                ></ConnectButton>
              </Col>
            </Row>
          </Col>
        </Row>
      </div>
    );
  } else {
    return (
      <Row
        justify="space-between"
        align="center"
        className={styles['menu-mobile']}
      >
        <AutoFixImage
          src={LogoIcon.src}
          width={50}
          height={49}
          onClick={() => {
            Router.push('/');
          }}
        ></AutoFixImage>
        <Row
          justify="end"
          align="center"
          style={{
            width: '50%',
          }}
        >
          {/* <AutoFixImage
            src={MenuIcon.src}
            width={30}
            height={21}
            onClick={handleClick}
          ></AutoFixImage> */}
          <Button style={{ background: '#37e1e0', border: 'none' }} onClick={() => {
            Router.push('https://www.luckystar.homes/suipresale');
          }}>Presale</Button>
        </Row>

        <Drawer
          anchor={'top'}
          open={openDropdown}
          onClose={handleClose}
          sx={{
            transform: 'translateY(90px)',
            background: '#000000',
            height: 'unset',
          }}
          PaperProps={{
            sx: {
              background: '#000000',
              color: '#ffffff',
              height: 'unset',
              width: '100%',
            },
          }}
        >
          {menuItems.map((item, index) => {
            return (
              <>
                <MenuItem
                  onClick={() => onItemClicked(item)}
                  id={'menu_' + item.text}
                >
                  <Row justify="space-between">
                    {item.icon}
                    {item.text}
                  </Row>
                </MenuItem>
                {item.children &&
                  openKeys.includes(item.key) &&
                  item.children.map((child) => {
                    return (
                      <MenuItem
                        onClick={child.onClick}
                        id={'menu_' + child.text}
                        style={{ paddingLeft: '30px' }}
                      >
                        <Row justify="space-between">
                          {child.icon}
                          {child.text}
                        </Row>
                      </MenuItem>
                    );
                  })}
              </>
            );
          })}
        </Drawer>
      </Row>
    );
  }
}
