import React from 'react';
import { Route, Switch } from 'react-router-dom';

import ContaEstoque from '../pages/ContaEstoque';
import HomePage from '../pages/Home';

const Routes = (props) => {
    return (
        <Switch>
            <Route exact path={'/'} component={HomePage} />
            <Route exact path={'/contaestoque'} component={ContaEstoque} />
        </Switch>
    );
}

export default Routes;