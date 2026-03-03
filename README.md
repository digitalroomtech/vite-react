## Documentation

- [Material UI](https://mui.com/material-ui/all-components/) - Nuestro sistema de estilos y componentes están basados en el framework Material UI
## Para empezar

### Instalación

Usando [npm](https://npmjs.org/)

```bash
npm i vite-easy-wall
```

### Configuración

```dotenv
# URL base del backend de Easy Wall
VITE_EW_URI=url-backend-easy-wall

# URL del portal de usuario
VITE_EW_URL_PORTAL=url-portal

# Nombre de la cookie de sesión
VITE_EW_COOKIE_TOKEN_NAME=nombre-de-la-cookie

# Dominio de la cookie (usa '.' para incluir subdominios, ej: .localhost)
VITE_EW_COOKIE_DOMAIN=.tudominio.com

# LLave de google para autenticación de usuario

VITE_EW_GOOGLE_API_KEY=.tudominio.com
```

### Panel

Configura el portal envolviendo tu aplicación `<SessionClientProvider/>`

```tsx
// main.tsx or index.tsx


import Corona from '../public/corona.svg';
import {
    SessionClientProvider,
    Panel,
    PanelAvatar,
    PanelHeader,
    PanelListItems,
    PanelSubscriptionIcon,
    PanelFooter,
} from 'react-easy-wall';

const config = {
    uri: import.meta.env.VITE_EW_URI,
    urlPortal: import.meta.env.VITE_EW_URL_PORTAL,
    cookieTokenName: import.meta.env.VITE_EW_COOKIE_TOKEN_NAME,
    cookieDomain: import.meta.env.VITE_EW_COOKIE_DOMAIN,
    googleClient: import.meta.env.VITE_EW_GOOGLE_API_KEY,
};


export default function RootLayout({children}: { children: React.ReactNode }) {
    return (
        <SessionClientProvider config={config}>
            <App />
            <Panel anchor="right" footer={<PanelFooter />}>
                <PanelHeader
                    containerProps={{
                        sx: {
                            backgroundColor: 'black',
                            height: 60,
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                        },
                    }}
                    imageProps={{
                        src: '/logo.svg',
                        width: 78,
                        height: 24,
                    }}
                />
                <PanelAvatar
                    SubscriptionImageComponent={
                        <PanelSubscriptionIcon>
                            <img src="/corona.svg" alt="corona-icon" width={16} height={16} />
                        </PanelSubscriptionIcon>
                    }
                />
                <PanelListItems routes={[{ path: '/', name: 'Artículos guardados' }]} title="MI CUENTA" />
            </Panel>
        </SessionClientProvider>
    );
}
```

### Boton de autenticación

Boton encargado de redireccionar al portal de autenticación y abrir panel de usuario

```tsx

const Button:React.FC = ()=>{
    return (
        <PanelButton
            registerButtonProps={{ sx: { background: 'black', color: 'white' } }}
            loginButtonProps={{ sx: { background: 'black', color: 'white' } }}
        />
    )
}

```

### Paywall

Para el uso del paywall envuelve con `<Paywall/>` el contenido a bloquear

```tsx

import {
    PaywallSubscription,
    PaywallRegister,
    Paywall
} from 'react-easy-wall';

const Component:React.FC = ()=>{
    return (
        <Paywall
            postPremium
            PaywallSubscriptionComponent={<PaywallSubscription />}
            PaywallRegisterComponent={<PaywallRegister />}>
            LoadingComponent={<div>Cargando...</div>}
            <div className="card">
                <button onClick={() => setCount((count) => count + 1)}>count is {count}</button>
                <p>
                    Edit <code>src/App.tsx</code> and save to test HMR
                </p>
            </div>
        </Paywall>
    )
}
```

### Uso del hook de sesión

```tsx
import React from "react";
import {useSession} from "react-easy-wall";

const Component: React.FC = () => {

    const {
        user, 
        subscription,
        config
    } = useSession()
    
    if(subscription) return <div>Tiene suscripción activa</div>

    if(user) return <div>Esta registrado y no tiene una suscripción activa</div>


    return (
        <div>No esta registrado y no tiene suscripción activa</div>
    )
}

```

### Guardar nota

```tsx
import React from "react";
import {useSession} from "react-easy-wall";

const Component: React.FC = () => {

    const { refetch } = useSession();
    
    return (
        <SaveNoteButton
            buttonProps={{
                sx: {
                    color: 'white',
                    backgroundColor: 'black',
                    height: 50,
                    width: 150,
                },
            }}
            postId={1325606}
            onCompleted={() => refetch()}
            withOutAuthorizationAction={() => console.log('No tiene suscripción activa')}
            NotSavedNoteComponent={<div>Guardar</div>}
            SavedNoteComponent={<div>Dejar de guardar</div>}
        />
    )
}

```

### Comentarios

```tsx
const Component = ()=>{
    return (
        <CommentProvider id={1325606} onlyForRegistered>
            <Comments
                showCommentButtonProps={{
                    showCommentButtonProps: {
                        sx: {
                            color: 'white',
                            backgroundColor: 'black',
                            maxWidth: 200,
                            borderRadius: '3px',
                            border: `3px solid #E8600B`,
                        },
                    },
                    enabledText: 'Dont show comments',
                    disabledText: 'Comments',
                }}
                createCommentContainerProps={{
                    createCommentTitleProps: {
                        sx: {
                            color: { md: 'red', xs: 'green' },
                        },
                    },
                    createCommentActionProps: {
                        loginButtonProps: {
                            sx: {
                                color: { md: 'red', xs: 'green' },
                            },
                        },
                        registerButtonProps: {
                            sx: {
                                color: { md: 'blue', xs: '#E8600B' },
                            },
                        },
                        subscriptionButtonProps: {
                            sx: {
                                color: 'red',
                            },
                        },
                    },
                    createCommentProps: {
                        createCommentAvatarProps: { sx: {} },
                        createCommentNameTextProps: { sx: {} },
                        createCommentButtonProps: {
                            sx: {
                                color: 'white',
                                backgroundColor: 'black',
                                maxWidth: 200,
                                borderRadius: '3px',
                                border: `3px solid #E8600B`,
                            },
                        },
                        createCommentContentProps: {
                            containerProps: {
                                sx: {},
                            },
                            textProps: {
                                sx: {},
                            },
                        },
                    },
                }}
                commentContainerProps={{
                    commentItemProps: {
                        commentTextProps: {
                            sx: {
                                color: 'red',
                            },
                        },
                        commentIconProps: {
                            sx: {
                                color: '#E8600B',
                            },
                        },
                    },
                    replyCommentItemProps: {
                        commentTextProps: {
                            sx: {
                                color: '#E8600B!important',
                            },
                        },
                        commentIconProps: {
                            sx: {
                                color: ' red',
                            },
                        },
                    },
                }}
                LoadingComponent={<div>Loading...</div>}
                commentSubscriptionProps={{
                    dialogProps: {},
                    dialogTextProps: {},
                }}
            />
        </CommentProvider>
    )
}
```# vite-react
