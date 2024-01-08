import {

  IconBrandTripadvisor,
  IconCalendarEvent,
  IconCalendarTime,
  IconChartPie,
  IconLayoutDashboard,
 
  IconUsers,
} from "@tabler/icons-react";

import { uniqueId } from "lodash";

const Menuitems = [
  {
    navlabel: true,
    subheader: "Accueil",
  },

  {
    id: uniqueId(),
    title: "Tableau de bord",
    icon: IconLayoutDashboard,
    href: "/admin",
  },
  {
    navlabel: true,
    subheader: "Gestion des sites",
  },
  {
    id: uniqueId(),
    title: "Sites Touristique",
    icon: IconBrandTripadvisor,
    href: "/admin/utilities/sites",
  },
  {
    id: uniqueId(),
    title: "Evènements",
    icon: IconCalendarEvent,
    href: "/admin/utilities/events",
  },
  {
    navlabel: true,
    subheader: "Gestion des comptes",
  },
  {
    id: uniqueId(),
    title: "Utilisateurs",
    icon: IconUsers,
    href: "/admin/users",
  },
 
  {
    navlabel: true,
    subheader: "Gestion des visites",
  },
  {
    id: uniqueId(),
    title: "Planifications",
    icon: IconCalendarTime,
    href: "/admin/schedule",
  },
  {
    id: uniqueId(),
    title: "Statistiques",
    icon: IconChartPie,
    href: "/admin/statistiques",
  },
];

export default Menuitems;
