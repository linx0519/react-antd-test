import Home from "../../src/components/home";
import Detail from "../../src/components/detail";
import Game from "../components/game";

export const routes = [
  {
    name: "首页",
    path: "/home",
    key: "",
    iconType: "home",
    component: Home
  },
  {
    name: "游戏",
    path: "/game",
    key: "",
    iconType: "thunderbolt",
    component: Game
  },
  {
    name: "详细",
    path: "/detail",
    key: "",
    iconType: "video-camera",
    component: Detail
  },
];






