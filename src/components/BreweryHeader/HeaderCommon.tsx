import { useEffect, useMemo, useState } from "react";
import { Link, useLocation } from 'react-router-dom';
import { Layout, Row, Col, Menu, Dropdown } from "antd";
import { MenuOutlined } from "@ant-design/icons";

import { useSurvey } from "./useSurvey";

import styles from "./Header.module.scss";

export default function Header(props: { injected, isMobile }) {
  const isDesktopOrLaptop = useMemo(()=>{
    return !props.isMobile;
  }, [props.isMobile])
  const [showSider, setShowSider] = useState(false);

  const { Header } = Layout;
  const router = useLocation();
  const { survey } = useSurvey();

  const routes = [
    {
      label: "Home",
      href: "/",
      regExp: /^\/$/g,
    },
    {
      label: "Projects",
      href: "/pools",
      regExp: /\/pools/,
      children: [
        {
          label: "INO",
          href: "/pools?tag=nft",
          regExp: /nft/,
        },
        {
          label: "IDO",
          href: "/pools?tag=ido",
          regExp: /ido/,
        },
        {
          label: "Campaign",
          href: "/pools?tag=campaign",
          regExp: /campaign/,
        },
      ],
    },
    {
      label: "Swap",
      href: "https://app.weswap.io",
      regExp: /\/farming/,
      target: "_blank",
    },
    {
      label: "Bridge",
      href: "/bridge",
      regExp: /c?bridge/,
      children: [
        {
          label: "Brewery Bridge",
          href: "/bridge",
          regExp: /\/bridge/,
        },
        {
          label: "cBridge",
          href: "/cbridge",
          regExp: /\/cBridge/,
        },
      ],
    },
    {
      label: "Staking",
      href: "/stake",
      regExp: /\/stake/,
    },
    {
      label: "Farm",
      href: "/farming",
      regExp: /\/farming/,
    },
  ];

  function onRouteClick(item) {
    survey(`header_click_${item.label}`, "");
  }

  function LinkTemplate(props: { item }) {
    let item = props.item;
    return (
      <a href={item.href} target={item?.target || "_self"}>
        <a
          onClick={() => {
            onRouteClick(item);
          }}
          className={[
            styles["button"],
            item.regExp.test(router.pathname) ? styles["active"] : "",
            item.target === '_blank' ? styles["outlink"] : "",
          ].join(" ")}
        >
          {item.label}
        </a>
      </a>
    );
  }

  const menu = (
    <Menu style={{ background: "#000000", border: "2px solid #34D76C80" }}>
      {routes.map((item, index) => {
        return item.children ? (
          item.children.map((item, _index) => {
            return (
              <Menu.Item
                className={[styles["menu-item"]].join(" ")}
                key={index + "_" + _index}
              >
                <LinkTemplate item={item}></LinkTemplate>
              </Menu.Item>
            );
          })
        ) : (
          <Menu.Item className={[styles["menu-item"]].join(" ")} key={index}>
            <LinkTemplate item={item}></LinkTemplate>
          </Menu.Item>
        );
      })}
      {props.injected ? (
        <Menu.Item className={[styles["menu-item"]].join(" ")} key={5}>
          {props.injected}
        </Menu.Item>
      ) : (
        <></>
      )}
    </Menu>
  );

  return (
    <Header className={styles["header"]}>
      <Row className={styles["main-content"]}>
        <Col span={6}>
          {/* logo */}
          <a href="/">
            <div style={{ cursor: "pointer" }}>
              <h1 className={styles["title"]}>
                <i className={styles["logo"]}></i>
              </h1>
            </div>
          </a>
        </Col>
        <Col
          span={isDesktopOrLaptop ? 18 : 4}
          offset={isDesktopOrLaptop ? 0 : 14}
        >
          {isDesktopOrLaptop ? (
            <Row
              className={styles.menu}
              key="desktop"
              justify="space-between"
              align="middle"
            >
              {routes.map((item, index) => {
                return item.children ? (
                  <Dropdown
                    overlay={
                      <>
                        <Menu className={styles["drop-menu"]}>
                          {item.children.map((child, _index) => {
                            return (
                              <Menu.Item
                                key={index + "_" + _index}
                                style={{ background: "#000000" }}
                              >
                                <LinkTemplate item={child}></LinkTemplate>
                              </Menu.Item>
                            );
                          })}
                        </Menu>
                      </>
                    }
                  >
                    <div
                      className={[
                        styles.button,
                        item.regExp.test(router.pathname) ? styles["active"] : "",
                      ].join(" ")}
                    >
                      {item.label}
                    </div>
                  </Dropdown>
                ) : (
                  <LinkTemplate item={item}></LinkTemplate>
                );
              })}
              {props.injected ? props.injected : <></>}
            </Row>
          ) : (
            <>
              <Row
                justify="end"
                align="middle"
                style={{ width: "100%", height: "100%" }}
              >
                <MenuOutlined
                  style={{ fontSize: "0.36rem" }}
                  onClick={() => setShowSider(!showSider)}
                ></MenuOutlined>
              </Row>
              <Layout.Sider
                collapsed={!showSider}
                collapsedWidth={0}
                theme="light"
                onClick={() => setShowSider(!showSider)}
                style={{
                  position: "fixed",
                  right: "0",
                  textIndent: "1em",
                  zIndex: "100",
                }}
              >
                {menu}
              </Layout.Sider>
              <div
                className={styles["sider-background"]}
                onClick={() => setShowSider(!showSider)}
                style={{ display: showSider ? "block" : "none" }}
              >
                &nbsp;
              </div>
            </>
          )}
        </Col>
      </Row>
    </Header>
  );
}
