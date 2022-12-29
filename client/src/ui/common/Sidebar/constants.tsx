import WorkIcon from '@mui/icons-material/Work';
import SportsIcon from '@mui/icons-material/Sports';
import GroupsIcon from '@mui/icons-material/Groups';
import FitnessCenterIcon from '@mui/icons-material/FitnessCenter';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';

export const sidebarItems = [
  {
    icon: (
      <GroupsIcon
        sx={{
          color: '#fff',
        }}
      />
    ),
    text: 'Clients',
    viewPermission: ['view_clients'],
    url: '/clients',
  },
  {
    icon: (
      <SportsIcon
        sx={{
          color: '#fff',
        }}
      />
    ),
    text: 'Trainers',
    viewPermission: ['view_trainer'],
    url: '/trainers',
  },
  {
    icon: (
      <FitnessCenterIcon
        sx={{
          color: '#fff',
        }}
      />
    ),
    text: 'Equipments',
    viewPermission: ['view_equipments'],
    url: '/equipments',
    isDefault: true,
  },
  {
    icon: (
      <WorkIcon
        sx={{
          color: '#fff',
        }}
      />
    ),
    text: 'Managers',
    viewPermission: ['view_managers'],
    url: '/managers',
  },
  {
    icon: (
      <CalendarMonthIcon
        sx={{
          color: '#fff',
        }}
      />
    ),
    text: 'Schedules',
    viewPermission: ['view_schedules', 'view_schedules_own'],
    url: '/schedules',
  },
];

export type TSidebatItem = typeof sidebarItems[0];
