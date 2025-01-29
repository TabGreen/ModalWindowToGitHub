class MWToGitHub{
    static getModalWindow(){
        let modalWindow = document.getElementById(mwToGitHub.MW_ID);
        if(!modalWindow){
            //MainEl
            modalWindow = document.createElement('div');
            modalWindow.hidden = true;
            modalWindow.id = mwToGitHub.MW_ID;
            //imgEl
            let imgEl = document.createElement('img');
            imgEl.class = mwToGitHub.IMG_class;
            mwToGitHub.IMG_EL = imgEl;
            //text
            let textEl = document.createElement('p');
            textEl.innerText = mwToGitHub.text;
            //userNameEl
            let userNameEl = document.createElement('span');
            userNameEl.class = mwToGitHub.GitHubUserNameElClass;
            mwToGitHub.GitHubUserNameEl = userNameEl;
            //
            modalWindow.appendChild(imgEl);
            textEl.appendChild(userNameEl);
            modalWindow.appendChild(textEl);
            /*
            大致结构
            <div id="ModalWindowToGitHub">
                <img class="github-user-img"></img>
                <p>你好,我是
                    <span class="github-user-name"></span>
                </p>
            </div>
            */
        }
        return modalWindow;
    }
    static getGitHubUserName(){//压缩来自FastLinkToGitHub
        let userName = undefined;
        //方案1:meta[name='author'content='github@userName']
        let meta_author=document.querySelector('meta[name="author"]');
        if(meta_author){let meta_authorcontent=meta_author.getAttribute
        ('content');let data=meta_authorcontent.split('@');if(data[0].
        toLowerCase()=='github'&&data[1]){userName=data[1];}}
        //方案2.1:meta[name=匹配前有author后有GitHub的字符串content='userName']
        let metas=document.getElementsByTagName('meta');for(let i=0;i<
        metas.length&&!userName;i++){let meta=metas[i];let metaName=
        meta.name.toLowerCase();if(metaName.includes('author')&&metaName.
        includes('github')){userName=meta.getAttribute('content');}}
        //方案2.2:meta[name=匹配GitHub的字符串content='userName']
        const isMatchHasOnlyGithub=false;for(let i=0;i<metas.length&&!
        userName&&isMatchHasOnlyGithub;i++){let meta=metas[i];let metaName
        =meta.name.toLowerCase();if(metaName.includes('github')){userName
        =meta.getAttribute('content');}}return userName;
    }
}
const mwToGitHub = {
    MW_ID:'ModalWindowToGitHub',
    IMG_class:'github-user-img',
    GitHubUserNameElClass:'github-user-name',
    text:'你好,我是',
    
    GitHubUserName:undefined,

    EL:null,
    IMG_EL:null,
    GitHubUserNameEl:null,
};
mwToGitHub.EL = MWToGitHub.getModalWindow();
mwToGitHub.GitHubUserName = MWToGitHub.getGitHubUserName();