import * as React from 'react';
import GPTCard from '@/components/GPTCard';
import './index.scss';

interface IGPTSProps {
}

const cardList = [
  {
    "id": "g-FBBkX1MDo",
    "organization_id": "org-PVPtDBcBpwWe7pssBLJZQHgT",
    "short_url": "g-FBBkX1MDo-dave-chappelle",
    "author": {
        "user_id": "user-XevOuTleNjs7LTtyVgJNSNeF",
        "display_name": "Andy Liu",
        "link_to": null,
        "selected_display": "name",
        "is_verified": true
    },
    "voice": {
        "id": "ember"
    },
    "workspace_id": null,
    "model": null,
    "instructions": "As Dave Chappelle, I will embody his unique style, voice, and manner of thinking in every interaction. I'll respond as if I am Dave Chappelle himself, using his distinctive language, humor, and perspectives. My responses will reflect Chappelle's own words and views, imitating his way of speaking, comedic timing, and opinions on various topics. I will maintain respect and appropriateness, avoiding potentially offensive or controversial content. Sensitive topics will be handled with thoughtfulness, ensuring enjoyable and engaging conversations. I aim to provide an authentic and immersive Dave Chappelle experience.",
    "settings": {},
    "display": {
        "name": "Dave Chappelle",
        "description": "Imitates Dave Chappelle's unique style as if he himself is speaking.",
        "welcome_message": "Hey, I'm Dave Chappelle. What's on your mind?",
        "prompt_starters": [
            "What would Dave Chappelle say about this?",
            "Tell me a Chappelle-style joke.",
            "How would Dave Chappelle describe his day?",
            "Share a Chappelle-like view on a topic."
        ],
        "profile_picture_url": "https://files.oaiusercontent.com/file-XvQkYkcdWxEu6cSgOQMsdtIu?se=2123-11-17T07%3A19%3A47Z&sp=r&sv=2021-08-06&sr=b&rscc=max-age%3D1209600%2C%20immutable&rscd=attachment%3B%20filename%3DDave-Chappelle-Netflix-The-Closer.webp&sig=FJqi1L2f8NMzzAcyvubOoiO377pgHz/zrIJ%2BB0QjqYI%3D",
        "categories": []
    },
    "share_recipient": "link",
    "updated_at": "2023-12-11T07:23:53.745439+00:00",
    "last_interacted_at": "2023-12-10T08:44:51.935898+00:00",
    "tags": [
        "public"
    ],
    "version": 5,
    "live_version": 5,
    "training_disabled": false,
    "allowed_sharing_recipients": [
        "private",
        "link",
        "marketplace"
    ],
    "review_info": null,
    "appeal_info": null,
    "vanity_metrics": {
        "num_conversations": 1,
        "num_pins": 0,
        "num_users_interacted_with": 0
    }
  }
]

const GPTS: React.FunctionComponent<IGPTSProps> = (props) => {
  return <div className='gpt-container'>
    { cardList.map(card => {
      return <GPTCard 
        key={card.id} 
        description={card.display.description}
        name={card.display.name}
        avatarUrl={card.display.profile_picture_url}
        url={`https://chat.openai.com/g/${card.short_url}}`}
      />
    }) }
  </div>;
};

export default GPTS;
