import React, { lazy, Suspense, useRef } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import './App.css';
import '@dpzvc3/styles/dist/index.css';

const LazyGuide = lazy(() => import('./views/Guide'));
const LazyButton = lazy(() => import('./views/Button'));
const LazyBadge = lazy(() => import('./views/Badge'));
const LazyPopup = lazy(() => import('./views/Popup'));
const LazyActionSheet = lazy(() => import('./views/ActionSheet'));

function AnimatedRoutes() {
  const location = useLocation();
  const nodeRef = useRef<HTMLDivElement>(null);

  return (
    <Suspense fallback={<div>loading...</div>}>
      <TransitionGroup component={null}>
        <CSSTransition
          key={location.key}
          timeout={300}
          classNames="page"
          nodeRef={nodeRef}
          unmountOnExit
        >
          <div className="page-wrapper" ref={nodeRef}>
            <Routes location={location}>
              <Route path="/" element={<LazyGuide />} />
              <Route path="/Button" element={<LazyButton />} />
              <Route path="/Badge" element={<LazyBadge />} />
              <Route path="/ActionSheet" element={<LazyActionSheet />} />
              <Route path="/Popup" element={<LazyPopup />} />
            </Routes>
          </div>
        </CSSTransition>
      </TransitionGroup>
    </Suspense>
  );
}

export default AnimatedRoutes;
