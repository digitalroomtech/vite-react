## Documentation

- [Material UI](https://mui.com/material-ui/all-components/) - Nuestro sistema de estilos y componentes están basados en
  el framework Material UI

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

# Llave de google para autenticación de usuario

VITE_EW_GOOGLE_API_KEY=.tudominio.com
```

### Sesión

Envuelve tu aplicación con el componente `<SessionClientProvider/>`

| Prop     | Tipo        | Descripción                       |
|:---------|:------------|:----------------------------------|
| children | `ReactNode` | Componente hijo                   |
| config   | `Config`    | Configuración global de la sesión |

```tsx
import {
    SessionClientProvider,
} from 'vite-easy-wall';

const Component = () => {
    return (
        <SessionClientProvider config={config}>
            <App/>
        </SessionClientProvider>
    );
}
```

<br>

#### Hook de la sesión

```tsx
import React from "react";
import {useSession} from "vite-easy-wall";

const Component: React.FC = () => {

    const {
        user,
        subscription,
        config
    } = useSession()

    if (subscription) return <div>Tiene suscripción activa</div>

    if (user) return <div>Esta registrado y no tiene una suscripción activa</div>


    return (
        <div>No esta registrado y no tiene suscripción activa</div>
    )
}

```

<br>

### Integración del Panel

#### `<Panel/>`

| Prop     | Tipo          | Descripción                                       |
|:---------|:--------------|:--------------------------------------------------|
| children | `ReactNode`   | Componente hijo                                   |
| footer   | `ReactNode`   | Componente del footer                             |
| ...rest  | `DrawerProps` | [Drawer](https://mui.com/material-ui/api/drawer/) |

<br>

#### Ejemplo:

```tsx
// main.tsx or index.tsx
import {
    SessionClientProvider,
    Panel,
    PanelAvatar,
    PanelHeader,
    PanelListItems,
    PanelSubscriptionIcon,
    PanelFooter,
} from 'vite-easy-wall';


const Component = () => {
    return (
        <Panel anchor="right" footer={<PanelFooter/>}>
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
                        <img src="/corona.svg" alt="corona-icon" width={16} height={16}/>
                    </PanelSubscriptionIcon>
                }
            />
            <PanelListItems routes={[{path: '/', name: 'Artículos guardados'}]} title="MI CUENTA"/>
        </Panel>
    );
}
```

<br>

### Boton de autenticación

Boton encargado de redireccionar al portal de autenticación y abrir panel de usuario

```tsx

const Button: React.FC = () => {
    return (
        <PanelButton
            registerButtonProps={{sx: {background: 'black', color: 'white'}}}
            loginButtonProps={{sx: {background: 'black', color: 'white'}}}
        />
    )
}

```

<br>

### Paywall

Para el uso del paywall envuelve con `<Paywall/>` el contenido a bloquear

#### `<Paywall/>`

| Prop                         | Tipo        | Descripción                             |
|:-----------------------------|:------------|:----------------------------------------|
| postPremium                  | `boolean`   | Id de la nota                           |
| LoadingComponent             | `ReactNode` | Componente de indicador de carga        |
| PaywallRegisterComponent     | `ReactNode` | Componente para bloqueo de usuarios     |
| PaywallSubscriptionComponent | `ReactNode` | Componente para bloqueo de suscriptores |

<br>

#### `<PaywallSubscription/>`

Bloqueo para usuarios que no poseen suscripción activa

| Prop                 | Tipo              | Descripción                                               |
|:---------------------|:------------------|:----------------------------------------------------------|
| containerProps       | `BoxProps`        | [Box](https://mui.com/material-ui/api/box/)               |
| titleProps           | `TypographyProps` | [Typography](https://mui.com/material-ui/api/typography/) |
| subtitleProps        | `TypographyProps` | [Typography](https://mui.com/material-ui/api/typography/) |
| buttonProps          | `ButtonProps`     | [Button](https://mui.com/material-ui/api/button/)         |
| buttonText           | `string`          | Texto en el boton de suscripciones                        |
| secondaryButtonProps | `ButtonProps`     | [Button](https://mui.com/material-ui/api/button/)         |
| secondaryButtonText  | `string`          | Texto en el boton secundario de suscripciones             |
| title                | `string`          | Título del modal                                          |
| subtitle             | `string`          | Subtitulo del modal                                       |

<br>

#### `<PaywallRegister/>`

Bloqueo para usuarios que no poseen registro

| Prop                 | Tipo              | Descripción                                               |
|:---------------------|:------------------|:----------------------------------------------------------|
| containerProps       | `BoxProps`        | [Box](https://mui.com/material-ui/api/box/)               |
| titleProps           | `TypographyProps` | [Typography](https://mui.com/material-ui/api/typography/) |
| subtitleProps        | `TypographyProps` | [Typography](https://mui.com/material-ui/api/typography/) |
| buttonProps          | `ButtonProps`     | [Button](https://mui.com/material-ui/api/button/)         |
| buttonText           | `string`          | Texto en el boton de suscripciones                        |
| secondaryButtonProps | `ButtonProps`     | [Button](https://mui.com/material-ui/api/button/)         |
| secondaryButtonText  | `string`          | Texto en el boton secundario de suscripciones             |
| title                | `string`          | Título del modal                                          |
| subtitle             | `string`          | Subtitulo del modal                                       |

<br>

#### Ejemplo:

```tsx

import {
    PaywallSubscription,
    PaywallRegister,
    Paywall
} from 'vite-easy-wall';

const Component: React.FC = () => {
    return (
        <Paywall
            postPremium
            PaywallSubscriptionComponent={<PaywallSubscription/>}
            PaywallRegisterComponent={<PaywallRegister/>}>
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

<br>

### Guardar nota

| Prop                       | Tipo                                                          | Descripción                                                       |
|:---------------------------|:--------------------------------------------------------------|:------------------------------------------------------------------|
| postId                     | `number`                                                      | Id de la nota                                                     |
| withOutAuthorizationAction | `() => void`                                                  | Action para cuando los usuarios no estan suscriptos o registrados |
| NotSavedNoteComponent      | `ReactNode`                                                   | Componente para cuando no esta guardada la nota                   |
| SavedNoteComponent         | `ReactNode`                                                   | Componente para cuando esta guardada la nota                      |
| SavedNoteComponent         | `(data:CreateSavedPostEvent or DeleteSavedPostEvent) => void` | Función para  obtener la data guardada                            |
| onCompleted                | `(data:Error) => void`                                        | Función para obtener el error de la mutación                      |

<br>

#### Ejemplo:

```tsx
import React from "react";
import {useSession} from "vite-easy-wall";

const Component: React.FC = () => {

    const {refetch} = useSession();

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
            postId={
                /*...*/
            }
            onCompleted={() => refetch()}
            withOutAuthorizationAction={() => console.log('No tiene suscripción activa')}
            NotSavedNoteComponent={<div>Guardar</div>}
            SavedNoteComponent={<div>Dejar de guardar</div>}
        />
    )
}

```

<br>

### Integración de Comentarios

#### `<CommentProvider/>`

| Prop               | Tipo      | Descripción                               |
|:-------------------|:----------|:------------------------------------------|
| id                 | `number`  | Id de la nota                             |
| onlyForRegistered  | `boolean` | Solo usuarios registrados pueden comentar |
| onlyForSubscribers | `boolean` | Solo usuarios suscritos pueden comentar   |

<br>

#### Ejemplo:

```tsx
const Component = () => {
    return (
        <CommentProvider
            id={
                /*...*/
            }
            onlyForRegistered={
                /* Condiciones */
            }
            onlyForSubscribers={
                /* Condiciones */
            }
        >
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
                            color: {md: 'red', xs: 'green'},
                        },
                    },
                    createCommentActionProps: {
                        loginButtonProps: {
                            sx: {
                                color: {md: 'red', xs: 'green'},
                            },
                        },
                        registerButtonProps: {
                            sx: {
                                color: {md: 'blue', xs: '#E8600B'},
                            },
                        },
                        subscriptionButtonProps: {
                            sx: {
                                color: 'red',
                            },
                        },
                    },
                    createCommentProps: {
                        createCommentAvatarProps: {sx: {}},
                        createCommentNameTextProps: {sx: {}},
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
```
