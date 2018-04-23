export function getRedirectPath({type, avatar}) {
    /**
     * type:
     * boss / genius
     * 是否有头像，avatar:
     * bossInfo / geniusInfo
    */
    let url = (type === 'boss') ? '/boss' : '/genius';
    if(!avatar){
        url += 'info';
    }
    return url;
}

export function getChatId(fromId, toId){
    return [fromId, toId].sort().join('_');
}