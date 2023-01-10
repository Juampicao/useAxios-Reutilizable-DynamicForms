export interface ProviderGeneralProps{
    children: any
}

export interface IProvider{
    createNew: () => void,
    getById: () => void;
    getAll: () => void;
    edit: () => void; 
    delete: () => void;

}

export interface ClubState {
    isLoading: boolean;
    clubs: Club[],
    // title: string,
    // className?: string,
    // url: string,
    // urlSchemaForm: string,

}


export interface Club{
  title: string,
  className?: string,
  url: string,
  urlSchemaForm: string,
}