import React from 'react';
import {mount} from 'react-mounter';

import {MainLayout} from '../imports/ui/MainLayout.jsx';
import '../imports/startup/accounts-config.js';
//components
import UpvoteTodosWrapper from '../imports/ui/UpvoteTodos/UpvoteTodosWrapper.jsx';

FlowRouter.route('/',{
	action(){
		mount(MainLayout,{
			content:(<UpvoteTodosWrapper />)
		});
	}
});
FlowRouter.notFound = {
  triggersEnter: [function(context, redirect) {
    redirect('/');
  }],
};