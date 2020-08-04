import React from 'react';
import { render, cleanup } from '@testing-library/react';
import { fireEvent } from '@testing-library/dom';
import { Provider } from 'react-redux';
import 'mutationobserver-shim';
import { applyMiddleware, createStore } from 'redux';
import thunk from 'redux-thunk';
import testData from './testData';
import App from './App';
import reducer from './reducers';


