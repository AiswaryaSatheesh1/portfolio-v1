export type HardwareSection = {
  heading: string;
  body: string[]; // paragraphs
  tip?: string;
};

export type HardwareItem = {
  slug: string;
  title: string;
  subtitle: string;
  date: string;
  image: string; // path under /public
  shortDesc: string;
  tags: string[];
  parts?: string[];
  sections: HardwareSection[];
};

export const HARDWARE: HardwareItem[] = [
  {
    slug: "fortigate-firewall",
    title: "FortiGate 70G Network & Firewall Implementation",
    subtitle: "Firewall configuration, WAN/LAN management, and network troubleshooting for a business environment",
    date: "2025",
    image: "/hardware/fortigate.png",
    shortDesc:
      "Designed, configured, and managed network security infrastructure using a FortiGate 70G firewall — covering WAN connectivity, LAN networking, VPN access, traffic monitoring, and performance troubleshooting.",
    tags: [
      "FortiGate 70G",
      "FortiView",
      "TCP/IP",
      "DHCP",
      "NAT",
      "VPN",
      "Routing",
      "LAN/WAN",
      "IP Addressing",
      "Network Troubleshooting",
    ],
    parts: [
      "Configured FortiGate 70G as the primary network firewall",
      "Configured and managed WAN1 / WAN2",
      "Integrated the firewall with the Omantel fiber connection",
      "Configured LAN networking and IP addressing",
      "Worked with DHCP and static IP assignments",
      "Configured and troubleshot VPN connectivity",
      "Managed network access between users, servers, and devices",
      "Used FortiView to monitor traffic, bandwidth, sessions, and network sources",
      "Investigated high latency, packet loss, and slow internet",
      "Troubleshot connectivity after network and firewall changes",
      "Managed devices across private IP networks such as 192.168.1.x",
      "Monitored network performance and identified high-bandwidth devices",
      "Troubleshot WAN connectivity and switched between WAN interfaces when required",
    ],
    sections: [
      {
        heading: "Overview",
        body: [
          "Designed, configured, and managed the network security infrastructure for a business environment using a FortiGate 70G firewall. The project spanned WAN connectivity, LAN networking, VPN access, traffic monitoring, and troubleshooting network performance and connectivity issues end to end.",
        ],
      },
      {
        heading: "WAN & connectivity",
        body: [
          "Configured and managed dual WAN interfaces (WAN1 / WAN2) on the FortiGate 70G, integrating the firewall with the Omantel fiber connection. This included setting up primary and backup internet paths so connectivity could fail over or be manually switched between WAN interfaces when one link degraded or dropped.",
        ],
      },
      {
        heading: "LAN, IP addressing & access",
        body: [
          "Configured LAN networking and IP addressing, working with both DHCP and static IP assignments across the network. Managed access between users, servers, and devices on private IP ranges (192.168.1.x), controlling what could reach what across the internal network.",
        ],
      },
      {
        heading: "VPN & troubleshooting",
        body: [
          "Configured and troubleshot VPN connectivity for secure remote access, and diagnosed connectivity issues that came up after network or firewall configuration changes — tracing problems back to policy changes, routing, or interface misconfigurations.",
        ],
        tip: "A recurring lesson here: most post-change connectivity issues traced back to a policy or routing rule that needed to be explicitly updated after a WAN or LAN change — nothing is ever really 'automatic' on a firewall.",
      },
      {
        heading: "Monitoring & performance",
        body: [
          "Used FortiView to monitor traffic, bandwidth, active sessions, and traffic sources in real time. Investigated reports of high latency, packet loss, and slow internet, identifying high-bandwidth devices and isolating the cause down to specific hosts, links, or misbehaving services.",
        ],
      },
      {
        heading: "Result",
        body: [
          "Improved visibility into network traffic and performance while maintaining secure connectivity between the company's internet, internal network, servers, and remote users.",
        ],
        tip: "Cloud relevance: this project strengthened my practical understanding of networking, routing, VPNs, firewall security, NAT, and traffic management — core concepts I apply when learning and designing AWS VPC infrastructure.",
      },
    ],
  },
  {
    slug: "synology-nas",
    title: "Synology DS425+ NAS Deployment",
    subtitle: "A centralized storage and backup platform built around the company's Windows file server",
    date: "2026",
    image: "/hardware/synology.png",
    shortDesc:
      "Introduced centralized network storage and a proper backup strategy for company files — moving away from relying entirely on a Windows file server toward a dedicated, monitored, and expandable storage layer.",
    tags: [
      "Synology DS425+",
      "Synology Storage Manager",
      "Active Backup for Business",
      "HAT3300-6T",
      "Network Storage",
      "SMB/File Sharing",
      "Windows Server",
      "Backup & Recovery",
      "RAID",
      "TCP/IP",
      "Network Infrastructure",
    ],
    parts: [
      "Synology DS425+ NAS — 4 drive bays, Intel Celeron J4125, 2GB RAM",
      "4 × 6TB Synology Plus Series HAT3300-6T drives (24TB raw)",
      "Synology Storage Manager for storage pool, volume, and health monitoring",
      "Active Backup for Business as the Windows file server backup destination",
      "Shared folders organized by department (Accounts, Engineering, Procurement, HSE, Stores, Management)",
      "Deployed inside the trusted internal network, behind the company firewall",
    ],
    sections: [
      {
        heading: "Where it started",
        body: [
          "The company was already running a Windows file server for shared files across departments. It worked, but it had become a single point of failure — if the server went down, file access went down with it, and if its storage failed, company data was at risk.",
          "The goal wasn't just to buy a NAS and copy files over. It was to build a proper storage and recovery layer around the existing infrastructure.",
        ],
      },
      {
        heading: "Choosing the NAS",
        body: [
          "I selected a Synology DS425+ — a 4-bay NAS built around an Intel Celeron J4125 with 2GB RAM, chosen for its support for multiple storage configurations, Synology's storage management tools, network file sharing, and Active Backup for Business, with room for future expansion.",
          "Storage was planned around four 6TB Synology Plus Series HAT3300-6T drives — 24TB raw capacity. One of the first lessons here: advertised capacity isn't usable capacity. RAID protection, filesystem overhead, and the chosen storage configuration brought the real usable volume down to approximately 15.7TB.",
        ],
      },
      {
        heading: "Defining the goal",
        body: [
          "Before configuring anything, I defined what the NAS actually needed to do: centralized company storage, reliable network file sharing, backup of the Windows file server, protection against hardware failure, capacity monitoring, easy file recovery, and room to grow.",
          "The NAS wasn't meant to replace every existing system immediately — it was designed as an additional layer of storage and data protection sitting alongside the Windows file server and the rest of the network.",
        ],
      },
      {
        heading: "Installing the drives & RAID",
        body: [
          "With all four drive bays populated (4 × 6TB, 24TB raw), the real work wasn't getting the drives recognized — it was configuring redundancy so a single disk failure wouldn't mean losing company data. That meant thinking through storage protection, usable capacity, drive health, future expansion, and backup requirements together, not as separate problems.",
        ],
        tip: "RAID is not a backup. That distinction became one of the most important parts of this project.",
      },
      {
        heading: "Storage Manager & capacity",
        body: [
          "Working through Synology Storage Manager is where the physical drives became an actual storage system — checking drive detection, the storage pool, volume, capacity, available space, and disk health. The resulting environment landed at roughly 15.7TB usable, and understanding exactly where that capacity was going mattered more than the '24TB' printed on the box.",
        ],
      },
      {
        heading: "Protecting the file server",
        body: [
          "With the existing Windows file server still in place, the next question was how to actually protect the data people were using day to day. The NAS became the secondary location for company data via a scheduled backup job from the file server — giving a fallback if something happened to the primary server.",
        ],
      },
      {
        heading: "Active Backup for Business",
        body: [
          "I evaluated Active Backup for Business as the way to back up the Windows server to the NAS, rather than relying on manually copying folders. That meant scheduled backups, centralized management, backup history, recovery options, and monitoring — moving from 'someone should copy the files' to 'the infrastructure automatically protects the files,' which is a much more reliable model.",
        ],
      },
      {
        heading: "Network integration",
        body: [
          "The NAS was connected to the existing company network with IP addressing, file-sharing protocols, user access, server-to-NAS communication, firewall rules, and bandwidth for backup traffic all considered up front. It needed to be reachable by the systems that required it without exposing unnecessary services outward — staying inside the trusted internal network rather than facing the public internet directly.",
        ],
      },
      {
        heading: "Access & file sharing",
        body: [
          "Storage is only useful if people can access what they're authorized to use. Shared folders were organized by department — Accounts, Engineering, Procurement, HSE, Stores, and Management — with permissions designed around users and departments rather than giving everyone access to everything. This is where storage stops being just a hardware project and becomes an infrastructure and security problem.",
        ],
      },
      {
        heading: "Monitoring",
        body: [
          "Storage capacity, drive health, volume status, utilization, available space, and backup status all needed ongoing monitoring — a server that suddenly hits 100% storage can take applications and services down with it, so capacity monitoring became part of normal infrastructure management rather than an afterthought.",
        ],
      },
      {
        heading: "What I learned",
        body: [
          "This project made clear that storage infrastructure is far more than buying hard drives — it's capacity planning, RAID, storage pools, volumes, file sharing, network access, permissions, backup strategy, recovery, hardware failure, monitoring, and future expansion, all at once.",
          "It also shifted how I framed the problem: instead of 'where should I put the files,' the real question became 'how do I make the data available, protected, monitored, recoverable, and scalable?' That's exactly the mindset I want to carry into cloud engineering.",
        ],
      },
      {
        heading: "Result",
        body: [
          "This project established a dedicated centralized storage and backup platform around the company's existing file-server infrastructure, with approximately 15.7TB of usable NAS storage and a foundation for automated server backup, data protection, and future storage expansion.",
        ],
        tip: "Cloud relevance: the concepts translate directly to AWS — Windows File Server → EC2/FSx, the NAS → S3/EFS/FSx, RAID/redundancy → AWS storage durability, backups → AWS Backup, network access → VPC, the firewall → Security Groups/NACLs, monitoring → CloudWatch, and access control → IAM. The technologies differ, but the underlying questions (who can access it, where is it stored, what happens if it fails, how is it backed up, how do I recover it, how do I monitor it) are the same ones I now ask when designing on AWS.",
      },
    ],
  },
  {
    slug: "server-rack-power",
    title: "Server Rack & Power Infrastructure",
    subtitle: "Building the infrastructure that everything else depends on",
    date: "2025",
    image: "/hardware/rack.png",
    shortDesc:
      "Organized the company's firewall, modem/router, switches, servers, NAS, and power protection into a structured, always-on server rack — the physical layer everything else runs on.",
    tags: [
      "FortiGate 70G",
      "Omantel Fiber",
      "Network Switches",
      "UPS",
      "Windows Server",
      "Synology NAS",
      "TCP/IP",
      "LAN/WAN",
      "Firewall",
      "Network Infrastructure",
      "Power Protection",
      "Server Rack",
      "Cable Management",
    ],
    parts: [
      "FortiGate 70G firewall",
      "Omantel modem/router",
      "Network switches",
      "Windows server",
      "Synology NAS",
      "UPS / power protection",
      "Patch and network cabling",
    ],
    sections: [
      {
        heading: "Where it started",
        body: [
          "Before worrying about servers, applications, backups, or cloud migration, there was a more basic problem: where does all the infrastructure actually live? Networking equipment, a firewall, modem/router, switches, servers, and UPS/power gear were all doing important jobs, but they needed to be organized into a proper rack to be manageable, troubleshootable, and protected.",
          "The goal was a clean, reliable physical setup that could run continuously without becoming a mess of cables and randomly placed equipment.",
        ],
      },
      {
        heading: "Planning the rack",
        body: [
          "The environment that needed a home: the FortiGate 70G firewall, the Omantel modem/router, network switches, the Windows server, the NAS, UPS/power protection, and patch/network cabling. The rack had to accommodate both the networking side and the server/storage side, with room left for future equipment — internet in through the modem, into the firewall, out to the switch, and down to the server, NAS, and users. Everything had a place, and a reason for being there.",
        ],
      },
      {
        heading: "Power comes first",
        body: [
          "A server rack isn't useful if the power isn't reliable. Building power feeds a UPS, which feeds power distribution out to the firewall, server, and NAS — the UPS protects against sudden power loss and buys the infrastructure time to shut down safely or keep running through short interruptions, depending on capacity.",
        ],
        tip: "The biggest lesson from this part of the project: infrastructure availability starts with physical power, not with anything running on top of it.",
      },
      {
        heading: "Arranging the equipment",
        body: [
          "Physical placement matters more than it seems. Equipment accessibility, cable routing, power/network cable separation, ventilation, device positioning, future expansion, and ease of troubleshooting all had to be considered together — not just to make the rack look clean, but so that months later, anyone could look inside and immediately understand what a device is, where a cable goes, and what happens if it's unplugged. That matters enormously when you're troubleshooting a live production issue.",
        ],
      },
      {
        heading: "Networking",
        body: [
          "The rack became the central point for the company's network: ISP into the Omantel modem, into the FortiGate 70G, out to the core/network switch, then fanning out to servers, NAS, network devices, CCTV infrastructure, and the office network. Working through IP addressing, connectivity, and firewall configuration alongside the physical layout made it much easier to isolate where a problem was actually occurring — an internet problem gets traced ISP → modem → firewall → switch, a server connectivity problem gets traced server → switch → firewall, a NAS outage gets traced NAS → switch → network. Instead of checking everything randomly, I could follow the actual path.",
        ],
      },
      {
        heading: "Cable management",
        body: [
          "Cable management sounds minor until you're troubleshooting a network at 9 AM with twenty cables going everywhere. Power, network, WAN, and server connections were organized and kept separable so connections could be identified and traced quickly — reducing the chance of disconnecting the wrong device and making future maintenance far easier.",
        ],
      },
      {
        heading: "Always-on infrastructure",
        body: [
          "The rack wasn't built to store equipment — it was built to create an always-on environment where power, network, firewall, switching, servers, storage, and backups all had to work together as layers. If any one layer fails, everything built on top of it can stop working, which made the rack itself part of the infrastructure rather than just furniture.",
        ],
      },
      {
        heading: "Troubleshooting & maintenance",
        body: [
          "Once everything was organized, troubleshooting got noticeably easier — WAN connectivity, firewall connectivity, network devices, server access, IP addressing, power interruptions, network cables, internet connectivity, device availability, and remote access all became easier to diagnose because the physical rack gave a much clearer picture of where a failure could actually be happening.",
        ],
      },
      {
        heading: "What I learned",
        body: [
          "This project taught me that cloud engineering doesn't start with AWS — it starts with understanding infrastructure. A cloud environment still needs networking, power, compute, storage, security, monitoring, backup, and availability; the difference is that AWS abstracts away most of the physical layer. Working with the physical version of all of this made those abstractions make a lot more sense: a physical switch maps to cloud networking, a physical firewall maps to Security Groups/Network Firewall, a physical server maps to EC2, physical storage maps to S3/EBS/EFS, and UPS/high availability maps to resilience and availability architecture.",
        ],
      },
      {
        heading: "Result",
        body: [
          "Built and organized the company's core physical infrastructure around a structured server rack — integrating power protection, firewall, networking, servers, and storage into a more reliable and maintainable environment.",
        ],
        tip: "Cloud relevance: this project gave me hands-on experience with the physical infrastructure concepts that underpin cloud environments — particularly networking, compute, storage, availability, security, and infrastructure reliability.",
      },
    ],
  },
  {
    slug: "physical-server",
    title: "Physical Server Infrastructure",
    subtitle: "Building the physical compute layer behind the company's IT infrastructure",
    date: "2025",
    image: "/hardware/physicalserver.png",
    shortDesc:
      "Prepared and integrated a dedicated physical server — a Dell Pro Tower QCT1250 — as reliable on-premise compute for file sharing, business applications, databases, and internal services.",
    tags: [
      "Dell Pro Tower QCT1250",
      "Intel i7-13620H",
      "16GB RAM",
      "1TB Storage",
      "Windows",
      "Windows Server",
      "RDP",
      "TCP/IP",
      "FortiGate 70G",
      "Synology NAS",
      "Server Rack",
      "UPS",
      "Backup & Recovery",
    ],
    parts: [
      "Dell Pro Tower QCT1250 — Intel Core i7-13620H, 16GB RAM, 1TB storage",
      "Windows 11 Pro with dedicated system drive",
      "Network connectivity and remote administration",
      "Integration with an existing Windows server environment",
      "Storage split between the server (applications, databases, internal systems) and the Synology NAS (backup)",
    ],
    sections: [
      {
        heading: "Where it started",
        body: [
          "The company needed reliable on-premise compute for services that couldn't simply disappear whenever someone's desktop was turned off — a dedicated physical server environment for file sharing, business applications, databases, attendance systems, and internal services. The goal was a dedicated machine that could stay online, be remotely administered, and act as the foundation for the company's internal IT systems.",
        ],
      },
      {
        heading: "The hardware",
        body: [
          "The primary infrastructure machine I prepared was a Dell Pro Tower QCT1250, configured with an Intel Core i7-13620H, 16GB RAM, 1TB storage, Windows 11 Pro, a dedicated system drive, network connectivity, and remote administration. I also worked with an existing Windows server environment running older hardware that needed modernizing. The important part wasn't just buying the hardware — it was preparing it to become a reliable part of the company's infrastructure.",
        ],
      },
      {
        heading: "Preparing the machine",
        body: [
          "Turning a bare machine into a usable infrastructure system meant installing and configuring Windows, preparing storage, configuring network connectivity, setting up required applications, configuring remote access, connecting it to the internal network, and testing connectivity and accessibility. The goal was making the machine ready for 24/7 infrastructure use, not treating it like a normal office PC.",
        ],
      },
      {
        heading: "Storage planning",
        body: [
          "The machine started with a single main drive, so I looked at how storage should be organized across different workloads. The broader design split responsibilities: the physical server handles applications, databases, file services, and internal systems, while the Synology NAS provides a separate storage and backup layer — keeping primary workloads and backup storage on different machines rather than one.",
        ],
      },
      {
        heading: "Connecting it to the network",
        body: [
          "The server joined the company's internal network along the same path as everything else: internet → Omantel → FortiGate 70G → network switch → physical server, out to file services, applications, the database, and internal systems. I worked through IP addressing, connectivity, firewall access, and remote administration to make sure the server could reach — and be reached by — the systems depending on it.",
        ],
      },
      {
        heading: "Remote administration",
        body: [
          "Since the infrastructure needed to stay accessible without physically sitting in front of the machine, remote administration mattered — RDP, network connectivity, server access, Windows administration, remote troubleshooting, and VPN-based access where required. That let infrastructure issues get investigated without needing physical access every time.",
        ],
      },
      {
        heading: "Server + NAS",
        body: [
          "The physical server and the NAS were designed as complementary halves of the same system: users go through the network switch to either the physical server (applications, file services, databases) or the Synology NAS (backups, storage, recovery). The server provides compute and applications; the NAS provides storage and backup. That separation makes the whole setup far easier to protect and maintain.",
        ],
      },
      {
        heading: "Reliability",
        body: [
          "A physical server isn't useful if it goes down every time there's a power or network hiccup — which is why this project connects directly to the rest of the infrastructure work: the server rack for physical organization, the UPS for power protection, the FortiGate for network security, the switch for connectivity, and the Synology NAS for backup and storage. Together, these form the company's on-premise infrastructure as a whole.",
        ],
      },
      {
        heading: "What I learned",
        body: [
          "Working with physical servers gave me a much clearer picture of what sits underneath cloud computing. Before the cloud abstracts it away, you have to think about hardware, CPU, RAM, storage, power, networking, cooling, operating systems, backups, availability, and remote administration directly.",
        ],
      },
      {
        heading: "Result",
        body: [
          "Prepared and integrated a dedicated physical compute environment into the company's IT infrastructure — connecting compute, networking, storage, backup, power protection, and remote administration into a reliable on-premise platform.",
        ],
        tip: "Cloud relevance: a physical server becomes EC2, physical storage becomes EBS/S3/EFS, physical networking becomes a VPC, physical firewall controls become Security Groups/NACLs, and physical backup infrastructure becomes AWS Backup — which makes this hands-on server experience directly relevant to my AWS Cloud Engineering path.",
      },
    ],
  },
];