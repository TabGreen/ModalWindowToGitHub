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
            //text_main
            let textEl = document.createElement('p');
            textEl.innerText = mwToGitHub.text;
            //text_userNameEl
            let userNameEl = document.createElement('span');
            userNameEl.class = mwToGitHub.GitHubUserNameElClass;
            mwToGitHub.GitHubUserNameEl = userNameEl;
            //data_labelEl
            let data_labelEl = document.createElement('p');


            let data_label_public_reposEl = document.createElement('span');
            data_label_public_reposEl.innerText = mwToGitHub.public_repos_label;
            data_label_public_reposEl.class = mwToGitHub.public_reposElClass;

            let data_label_followersEl = document.createElement('span');
            data_label_public_reposEl.innerText = mwToGitHub.followers_label;
            data_label_followersEl.class = mwToGitHub.followersElClass;

            let data_label_followingEl = document.createElement('span');
            data_label_followingEl.innerText = mwToGitHub.following_label;
            data_label_followingEl.class = mwToGitHub.followingElClass;


            data_labelEl.appendChild(data_label_public_reposEl);
            data_labelEl.appendChild(data_label_followersEl);
            data_labelEl.appendChild(data_label_followingEl);
            //dataEl
            let dataEl = document.createElement('p');
            dataEl.class = mwToGitHub.dataElClass;

            let public_reposEl = document.createElement('span');
            public_reposEl.class = mwToGitHub.public_reposElClass;
            public_reposEl.innerText = '';

            let followersEl = document.createElement('span');
            followersEl.class = mwToGitHub.followersElClass;
            followersEl.innerText = '';

            let followingEl = document.createElement('span');
            followingEl.class = mwToGitHub.followingElClass;
            followingEl.innerText = '';

            dataEl.appendChild(public_reposEl);
            dataEl.appendChild(followersEl);
            dataEl.appendChild(followingEl);

            mwToGitHub.public_reposEl = public_reposEl;
            mwToGitHub.followersEl = followersEl;
            mwToGitHub.followingEl = followingEl;
            //bioEl
            let bioEl = document.createElement('p');
            bioEl.class = mwToGitHub.bioElClass;
            bioEl.innerText = '';

            mwToGitHub.bioEl = bioEl;
            //
            modalWindow.appendChild(imgEl);
            textEl.appendChild(userNameEl);
            modalWindow.appendChild(textEl);
            modalWindow.appendChild(data_labelEl);
            modalWindow.appendChild(dataEl);
            modalWindow.appendChild(bioEl);
            /*
            大致结构
            <div id="ModalWindowToGitHub">
                <img class="github-user-img"></img>
                <p>
                    <span class="github-user-name"></span>
                </p>
                <p class='data-label'>
                    <span class="public_repos"></span>
                    <span class="followers"></span>
                    <span class="following"></span>
                </p>
                <p class='data'>
                    <span class="public_repos"></span>
                    <span class="followers"></span>
                    <span class="following"></span>
                </p>
                <p class='bio'></p>
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
    text:'',

    data_labelClass:'data-label',
    public_repos_label:'存储库',
    followers_label:'跟随者',
    following_label:'关注者',

    dataElClass:'data',
    public_reposElClass:'public_repos',
    followersElClass:'followers',
    followingElClass:'following',
    bioElClass:'bio',

    GitHubUserName:undefined,

    EL:null,
    IMG_EL:null,
    GitHubUserNameEl:null,

    public_reposEl:null,
    followersEl:null,
    followingEl:null,
    bioEl:null,
};
const mwToGitHub_ajaxData = {
    IMG_URL:null,
    public_repos:null,
    followers:null,
    following:null,
    bio:null,
}
mwToGitHub.EL = MWToGitHub.getModalWindow();
mwToGitHub.GitHubUserName = MWToGitHub.getGitHubUserName();
