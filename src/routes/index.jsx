import React from 'react';
import { Route, Switch } from 'react-router-dom';

import ContaEstoque from '../pages/ContaEstoque';

const Routes = (props) => {
    return (
        <Switch>
            <Route exact path={'/'} component={ContaEstoque} />
        </Switch>
    );
}

export default Routes;