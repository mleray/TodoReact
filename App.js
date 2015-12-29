import React from 'react';
import ReactDOM from 'react-dom';

var TaskRow = React.createClass({
    render: function() {
        return (
            <tr>
                <td>{this.props.task.name}</td>
                <td>{this.props.task.desc}</td>
                <td>{this.props.task.status}</td>
                <td><input type='button' value='X'/></td>
            </tr>);
        }
});

var TaskTable = React.createClass({
    getInitialState: function() {
            return {tasks: []};
    },

    newTask: function(n, d, s) {
        var newT = {id: this.state.tasks.length, name: n, desc: d, status: s};
        this.setState({ 
            tasks: this.state.tasks.concat([newT])});
    },

    addTask: function(n, d, s) {
        
        var desc = document.getElementById('newTaskDesc').value;
        var name = document.getElementById('newTaskName').value;
        var stat = document.getElementById('newStatus').value;

            if (name !== '') {

            this.newTask(name, desc, stat);

            document.getElementById('newTaskName').value = '';
            document.getElementById('newTaskDesc').value = '';
            } else { alert('The new task must have a name');
        }
    },

    render: function() {
        // var tName = 'newTaskName' + this.props.idx;
        // var tDesc = 'newTaskDesc' + this.props.idx;
        // var tStat = 'newStatus' + this.props.idx;
        var rows = [];

        this.state.tasks.forEach(function(t) {
        if (((t.status === 'Non-completed') && this.props.compOnly) || 
            ((t.status === 'Completed') && this.props.nonCompOnly)) {
         return;
        }
        rows.push(<TaskRow key={t.id} task={t}/>);}.bind(this));
        return (
            <div>
            <table id='listTasks'>
            <caption>{this.props.title}</caption>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Description</th>
                        <th>Status</th>
                        <th>Delete</th>
                    </tr>
                </thead>
                <tbody>{rows}</tbody>
                </table>
                <b>Add new task: </b>
                <p>
                    <input type='text' id='newTaskName' placeholder='Task name'/>
                    <input type='text' id='newTaskDesc' placeholder='Task description'/>
                    <br/>
                    <b>State: </b>
                    <select id='newStatus'>
                    <option>Non-completed</option>
                    <option>Completed</option>
                    </select>
                    <input type='button' value='Add task' onClick={this.addTask}/>
                </p>
            </div>
        );
    }
});

var App = React.createClass({
	getInitialState: function() {
        return {
            compOnly: false,
            nonCompOnly: false,
            tabLists: []}
    },

    handleComp: function() {
        var newComp = document.getElementById('compChk').checked;
        this.setState({
            compOnly: newComp,
            nonCompOnly: false
        });
    },

    handleNonComp: function() {
        var newNonComp = document.getElementById('nonCompChk').checked;
        this.setState({
            compOnly: false,
            nonCompOnly: newNonComp
        });
    },

    newList: function(t) {
        var newL = {id: this.state.tabLists.length, title: t};
        this.setState({ 
            tabLists: this.state.tabLists.concat([newL])
        });
    },

    addList: function() {
        var t = document.getElementById('newListName').value;
        if (t !== '') {
            this.newList(t);
            document.getElementById('newListName').value = '';
        } else { alert('You must enter a name for the list'); }
    },

    delList: function(index) {
        var name = document.getElementById('delListName').value; 
        var tl = this.state.tabLists;
        var deleted = false;
        if (name !== '') {
            for(var i=0; i < tl.length; i++){
                if(tl[i].title === name) {
                    var newL = this.state.tabLists.slice();
                    newL.splice(i, 1);
                    this.setState({tabLists: newL});
                    deleted = true;
                }
            } if(deleted === false) {alert('This list does not exist');}
            document.getElementById('delListName').value = ''; 
        } else { alert('You must enter a name for the list'); }
    },

    render: function() {
        var allLists = [];
        var tl = this.state.tabLists;
        for (var i = 0; i < tl.length; i++) {
            var curList = tl[i];
            allLists.push(
                <TaskTable key={curList.id} title={curList.title}
                compOnly={this.state.compOnly} nonCompOnly={this.state.nonCompOnly} />);
        }
        return (
            <div>
                <b>Add new list: </b>
                <form>
                    <input id='newListName' type='text' placeholder='List name' />
                    <input type='button' value='Add list' onClick={this.addList}/>
                </form>
                <p>
                    <input id='nonCompChk' type='checkbox' onChange={this.handleNonComp}/>
                    Only show non-completed tasks
                </p>
                <p>
                    <input id='compChk' type='checkbox' onChange={this.handleComp}/>
                    Only show completed tasks
                </p>
                <b>Delete a list: </b>
                <form>
                    <input id='delListName' type='text' placeholder='List name' />
                    <input type='button' value='Delete list' onClick={this.delList}/>
                </form>
                <div>{allLists}</div>
                </div>
            );
        }
    });

ReactDOM.render(<App/>, document.getElementById('app'))