Storage.prototype.setObject = function( key, value ) {
    try {
        this.setItem( key, JSON.stringify( value ) );
    } catch( domException ) {
        if(
            ['QuotaExceededError', 'NS_ERROR_DOM_QUOTA_REACHED'].includes( domException.name )
        ) {
            console.error( 'Local storage is not supported.' );
        }
        else {
        }
    }
};

Storage.prototype.getObject = function( key ) {
    let value = this.getItem( key );
    try {
        return value && JSON.parse( value );
    } catch( err ) {
        this.setObject( key, false );
    }
};
