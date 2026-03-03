import { useState } from 'react';
import reactLogo from './assets/react.svg';
import viteLogo from '/vite.svg';
import './App.css';
import {
  PanelButton,
  Paywall,
  PaywallSubscription,
  PaywallRegister,
  CommentProvider,
  Comments,
  SaveNoteButton,
} from 'vite-easy-wall';
import { useSession } from 'vite-easy-wall';

function App() {
  const [count, setCount] = useState(0);

  const { refetch } = useSession();

  return (
    <div style={{ minWidth: 500 }}>
      <div>
        <a href="https://vite.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div style={{ marginBottom: '2rem' }}>
        <PanelButton
          registerButtonProps={{ sx: { background: 'black', color: 'white' } }}
          loginButtonProps={{ sx: { background: 'black', color: 'white' } }}
        />
      </div>

      <Paywall
        postPremium
        PaywallSubscriptionComponent={<PaywallSubscription />}
        LoadingComponent={<div>Cargando...</div>}
        PaywallRegisterComponent={<PaywallRegister />}>
        <div className="card">
          <button onClick={() => setCount((count) => count + 1)}>count is {count}</button>
          <p>
            Edit <code>src/App.tsx</code> and save to test HMR
          </p>
        </div>
      </Paywall>
      <p className="read-the-docs">Click on the Vite and React logos to learn more</p>
      <div style={{ marginBottom: '2rem' }}>
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
      </div>
      <div>
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
      </div>
    </div>
  );
}

export default App;
