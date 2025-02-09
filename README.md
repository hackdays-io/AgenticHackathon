# Deep Rewarding
The Deep Rewarding project is a mechanism designed to ensure fair and transparent reward distribution within decentralized communities. This system addresses a common problem: how to evaluate and distribute rewards equitably among various contributors in a decentralized setting. These contributors include developers, designers, documentation writers, and community organizers.

The reward mechanism is inspired by Deep Funding (a mechanism of public good funding proposed by Vitalik and Kevin Owocki) and uses a multi-step process for contribution evaluation and compensation.

## Description

This system is primarily composed of two main components: a Telegram Agent Bot and Dependencies Graph Generation.

### Telegram Agent Bot
![image](https://github.com/user-attachments/assets/7d8e6ded-dc01-4d99-a0b7-cd2500ea3c2f)


The Telegram Agent Bot serves as an on-chain engagement facilitator in the community’s Telegram group. Its main functions include:

1. **Monitoring Conversations**  
   - The bot listens to messages in real time to detect instances where one member assists another (e.g., technical help, design feedback, etc.).

2. **Reminding Members to Send Assist Credits**  
   - When the bot identifies meaningful support, it suggests sending **Assist Credits** (ERC1155 tokens) to the helper. This ensures valuable contributions are recognized and recorded.

3. **Reducing Friction**  
   - By prompting users, the bot reduces the likelihood that contributors forget to acknowledge each other’s efforts, thereby maintaining a culture of active appreciation.

4. **Integration with AI**  
   - The bot may leverage AI (e.g., a large language model running on Gaia Network or similar) to interpret natural language context and generate more accurate or timely reminders.


### Dependencies Graph Generation

![image](https://github.com/user-attachments/assets/d1ac99f6-1c83-4265-b366-f8a8b9cf88cf)

The Dependencies Graph Generation component focuses on analyzing and visualizing relationships between community members based on the Assist Credit transactions. Key steps include:

1. **On-Chain Data Aggregation**  
   - All Assist Credit transfers are recorded on-chain, creating an immutable history of who helped whom, and by how much.

2. **AI-Driven Graph Construction**  
   - An AI agent processes the transaction data to generate various dependency graphs, each highlighting interdependencies and the relative impact of different contributors.
     
     ![image](https://github.com/user-attachments/assets/93f4473d-161a-4bdc-846d-a6a7c66be95f)


3. **Human Validation**  
   - Community members can spot-check or manually review the AI-generated graphs to ensure they accurately reflect real-world contributions and aren’t skewed by anomalies.

4. **Reward Calculation**  
   - After validation, the dependency graph helps determine how a reward pool (e.g., USDC held in a DAO treasury) should be proportionally allocated to contributors.
     
     ![image](https://github.com/user-attachments/assets/5670496f-6c6e-41f8-9b3f-d05d0d49d203)


## Contracts and Subgraph

### Assist credit contract (Sepolia)
```
0x2939D7Dd2dF88f901A2de4B282367134480bBdC2
```

### The Graph endpoint
https://api.studio.thegraph.com/query/34436/agentethereum_fractiontoken/0.0.3/graphql
