export interface Todo {
    id: string;
    desc: string;
    completed: boolean;
}

export interface TodoState {
    todoCount: number;
    todos: Todo[],
    completed: number;
    pending: number;
}


type TodoAction = 
    | { type: 'addTodo', payload: Todo }
    | { type: 'toggleTodo', payload: { id: string } };


export const clubReducer = ( state: TodoState, action: TodoAction ): TodoState => {

    switch ( action.type ) {
        case 'addTodo':
            return {
                ...state,
                todos: [ ...state.todos, action.payload ]
            }

        case 'toggleTodo': 
            return {
                ...state,
                todos: state.todos.map( ({ ...todo }) => {
                    if( todo.id === action.payload.id ) {
                        todo.completed = !todo.completed;
                    }
                    return todo;
                })
            }

            
        default:
            return state;
    }

}