export interface ITask {
    id: number;
    title: string;
    text: string;
    [key: string]: string | number;
}

export interface ISetModalActive {
    (task: ITask | null): void;
}

export interface ISetModal {
    (modal: boolean): void;
}

export interface IAddTask {
    (task: ITask): void;
}

export interface IEditTask {
    (task: ITask, id: number): void;
}

export interface IDeleteTask {
    (id: number): void;
}

export interface IFilter {
    sort: string;
    query: string;
}

export interface SetFilterFunc {
    (
        e:
            | React.ChangeEvent<HTMLInputElement>
            | React.MouseEvent<SVGElement, MouseEvent>
            | undefined
    ): void;
}

export interface Option {
    value: string;
    label: string;
}

export interface SetSortFunc {
    (option: Option): void;
}
