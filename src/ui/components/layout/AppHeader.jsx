import React, { useMemo, useState } from 'react';
import {
  Layout,
  Typography,
  Avatar,
  Badge,
  Dropdown,
  Input,
  Button,
  List,
} from 'antd';
import {
  BellOutlined,
  SearchOutlined,
  UserOutlined,
  LogoutOutlined,
  SettingOutlined,
  ProfileOutlined,
  MenuOutlined,
} from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import { userServices } from '../../../services/userServices';
import { notifications, COMPANY } from '../../../data/mock/executiveData';
import { toast } from 'react-toastify';
import './AppHeader.css';

const { Header } = Layout;

function getGreeting() {
  const h = new Date().getHours();
  if (h < 12) return 'Buenos días';
  if (h < 19) return 'Buenas tardes';
  return 'Buenas noches';
}

export default function AppHeader({ onOpenMenu }) {
  const navigate = useNavigate();
  const [user, setUser] = useState(() => userServices.getCurrentUser());
  const [notifOpen, setNotifOpen] = useState(false);

  React.useEffect(() => {
    const sync = () => setUser(userServices.getCurrentUser());
    window.addEventListener('session-changed', sync);
    window.addEventListener('storage', sync);
    return () => {
      window.removeEventListener('session-changed', sync);
      window.removeEventListener('storage', sync);
    };
  }, []);

  const dateLabel = useMemo(
    () =>
      new Date().toLocaleDateString('es-CO', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      }),
    []
  );

  const unread = notifications.filter((n) => n.unread).length;

  const handleLogout = () => {
    userServices.logout();
    setUser(null);
    toast.info('Sesión cerrada');
    navigate('/login', { replace: true });
  };

  const menuItems = [
    { key: 'profile', icon: <ProfileOutlined />, label: 'Mi perfil' },
    ...(user?.role === 'admin'
      ? [{ key: 'settings', icon: <SettingOutlined />, label: 'Configuración' }]
      : []),
    { type: 'divider' },
    { key: 'logout', icon: <LogoutOutlined />, label: 'Cerrar sesión', danger: true },
  ];

  const onMenu = ({ key }) => {
    if (key === 'logout') return handleLogout();
    if (key === 'profile') return navigate('/profile');
    if (key === 'settings') return navigate('/settings');
  };

  const notifContent = (
    <div className="app-header__notif-panel">
      <Typography.Text strong>Notificaciones</Typography.Text>
      <List
        size="small"
        dataSource={notifications}
        renderItem={(item) => (
          <List.Item className={item.unread ? 'is-unread' : ''}>
            <List.Item.Meta title={item.title} />
          </List.Item>
        )}
      />
    </div>
  );

  return (
    <Header className="app-header-exec">
      <div className="app-header-exec__left">
        {onOpenMenu && (
          <Button
            type="text"
            className="app-header-exec__menu-btn"
            icon={<MenuOutlined />}
            onClick={onOpenMenu}
          />
        )}
        <div className="app-header-exec__greeting" data-tour="header-greeting">
          <Typography.Title level={4} className="app-header-exec__greet">
            {getGreeting()}
            {user?.name ? `, ${user.name.split(' ')[0]}` : ''}
          </Typography.Title>
          <Typography.Text className="app-header-exec__meta">
            {COMPANY.name} · {dateLabel}
          </Typography.Text>
        </div>
      </div>

      <div className="app-header-exec__right">
        <Input
          allowClear
          prefix={<SearchOutlined />}
          placeholder="Buscar indicadores, clientes, reportes..."
          className="app-header-exec__search"
          data-tour="header-search"
        />

        <span data-tour="header-notifications">
          <Dropdown
            dropdownRender={() => notifContent}
            trigger={['click']}
            open={notifOpen}
            onOpenChange={setNotifOpen}
            placement="bottomRight"
          >
            <Badge count={unread} size="small">
              <Button type="text" className="app-header-exec__icon-btn" icon={<BellOutlined />} />
            </Badge>
          </Dropdown>
        </span>

        <Dropdown menu={{ items: menuItems, onClick: onMenu }} placement="bottomRight" trigger={['click']}>
          <button type="button" className="app-header-exec__profile" data-tour="header-profile">
            <Avatar size={36} icon={<UserOutlined />} style={{ background: user?.role === 'admin' ? '#1677ff' : '#0ea5e9' }} />
            <div className="app-header-exec__profile-text">
              <span className="name">{user?.name || 'Ejecutivo'}</span>
              <span className="role">{user?.title || (user?.role === 'admin' ? 'Administrador' : 'Usuario')}</span>
            </div>
          </button>
        </Dropdown>
      </div>
    </Header>
  );
}
