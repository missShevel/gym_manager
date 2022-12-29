import { ListItem, ListItemButton, ListItemIcon, ListItemText } from '@mui/material';
import { User } from 'domains';
import { useNavigate } from 'react-router';
import { Box, List } from 'ui/components';
import { sidebarItems, TSidebatItem } from './constants';
import { sidebarPermissionFilter } from './helpers';

interface ISidebarProps {
  user: User;
}

export default function Sidebar({ user }: ISidebarProps) {
  const navigate = useNavigate();
  const sidebarItemsFiltered = sidebarItems.filter(sidebarPermissionFilter(user));

  const handleItemClick = (item: TSidebatItem) => {
    navigate(item.url);
  };

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'top',
        backgroundColor: 'primary.dark',
        color: 'secondary.contrastText',
        width: '200px',
        padding: 0,
      }}
    >
      <nav>
        <List>
          {sidebarItemsFiltered.map((item, index) => (
            <ListItem disablePadding key={index}>
              <ListItemButton onClick={() => handleItemClick(item)}>
                <ListItemIcon>{item.icon}</ListItemIcon>
                <ListItemText>{item.text}</ListItemText>
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </nav>
    </Box>
  );
}
