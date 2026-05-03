export interface FunctionCategory {
  name: string;
  functions: string[];
}

export const functionCategories: FunctionCategory[] = [
  {
    name: "Cache",
    functions: [
      "cache.invalidate",
      "cache.iscached",
      "cache.replace",
      "cloneref",
      "compareinstances",
    ],
  },
  {
    name: "Closures",
    functions: [
      "checkcaller",
      "clonefunction",
      "getcallingscript",
      "getscriptclosure",
      "hookfunction",
      "iscclosure",
      "islclosure",
      "isexecutorclosure",
      "loadstring",
      "newcclosure",
    ],
  },
  {
    name: "Console",
    functions: [
      "rconsoleclear",
      "rconsolecreate",
      "rconsoledestroy",
      "rconsoleinput",
      "rconsoleprint",
      "rconsolesettitle",
    ],
  },
  {
    name: "Crypt",
    functions: [
      "crypt.base64encode",
      "crypt.base64decode",
      "crypt.encrypt",
      "crypt.decrypt",
      "crypt.generatebytes",
      "crypt.generatekey",
      "crypt.hash",
    ],
  },
  {
    name: "Debug",
    functions: [
      "debug.getconstant",
      "debug.getconstants",
      "debug.getinfo",
      "debug.getproto",
      "debug.getprotos",
      "debug.getstack",
      "debug.getupvalue",
      "debug.getupvalues",
      "debug.setconstant",
      "debug.setstack",
      "debug.setupvalue",
    ],
  },
  {
    name: "Drawing",
    functions: [
      "Drawing.new",
      "Drawing.Fonts",
      "cleardrawcache",
      "getrenderproperty",
      "isrenderobj",
      "setrenderproperty",
    ],
  },
  {
    name: "Filesystem",
    functions: [
      "readfile",
      "listfiles",
      "writefile",
      "makefolder",
      "appendfile",
      "isfile",
      "isfolder",
      "delfolder",
      "delfile",
      "loadfile",
      "dofile",
    ],
  },
  {
    name: "Input",
    functions: [
      "isrbxactive",
      "mouse1click",
      "mouse1press",
      "mouse1release",
      "mouse2click",
      "mouse2press",
      "mouse2release",
      "mousemoveabs",
      "mousemoverel",
      "mousescroll",
    ],
  },
  {
    name: "Instances",
    functions: [
      "fireclickdetector",
      "getcallbackvalue",
      "getconnections",
      "getcustomasset",
      "gethiddenproperty",
      "sethiddenproperty",
      "gethui",
      "getinstances",
      "getnilinstances",
      "isscriptable",
      "setscriptable",
      "setrbxclipboard",
    ],
  },
  {
    name: "Metatable",
    functions: [
      "getrawmetatable",
      "hookmetamethod",
      "getnamecallmethod",
      "isreadonly",
      "setrawmetatable",
      "setreadonly",
    ],
  },
  {
    name: "Misc",
    functions: [
      "identifyexecutor",
      "lz4compress",
      "lz4decompress",
      "messagebox",
      "queue_on_teleport",
      "request",
      "setclipboard",
      "setfpscap",
    ],
  },
  {
    name: "Scripts",
    functions: [
      "getgc",
      "getgenv",
      "getloadedmodules",
      "getrenv",
      "getrunningscripts",
      "getscriptbytecode",
      "getscriptclosure",
      "getscripthash",
      "getscripts",
      "getsenv",
      "getthreadidentity",
      "setthreadidentity",
    ],
  },
  {
    name: "WebSocket",
    functions: ["WebSocket", "WebSocket.connect"],
  },
];

export const totalFunctions = functionCategories.reduce(
  (acc, cat) => acc + cat.functions.length,
  0
);

export interface TestResult {
  functionName: string;
  category: string;
  status: "supported" | "partial" | "unsupported";
  message?: string;
}

export interface TestResultData {
  id: string;
  executorName: string;
  executorVersion?: string;
  identityLevel?: number;
  timestamp: number;
  totalSupported: number;
  totalPartial: number;
  totalUnsupported: number;
  results: TestResult[];
}

export const demoTestData: TestResultData = {
  id: "demo-12345",
  executorName: "mUNC Test",
  executorVersion: "1.0.0",
  identityLevel: 8,
  timestamp: Date.now(),
  totalSupported: 72,
  totalPartial: 6,
  totalUnsupported: 4,
  results: [
    ...functionCategories.flatMap((cat) =>
      cat.functions.map((fn, i) => {
        const rand = Math.random();
        let status: "supported" | "partial" | "unsupported" = "supported";
        if (rand > 0.9) status = "unsupported";
        else if (rand > 0.8) status = "partial";

        if (cat.name === "Drawing" && (fn === "getrenderproperty" || fn === "setrenderproperty")) {
          status = "partial";
        }
        if (cat.name === "Crypt" && (fn === "crypt.encrypt" || fn === "crypt.decrypt")) {
          status = "partial";
        }
        if (cat.name === "Instances" && (fn === "setrbxclipboard" || fn === "isscriptable")) {
          status = i % 3 === 0 ? "unsupported" : status;
        }
        if (cat.name === "Input" && fn.startsWith("mouse2")) {
          status = "partial";
        }

        return {
          functionName: fn,
          category: cat.name,
          status,
          message: status === "partial" ? "Limited functionality" : status === "unsupported" ? "Function not found" : undefined,
        };
      })
    ),
  ],
};

export function getCategoryResults(results: TestResult[], categoryName: string) {
  return results.filter((r) => r.category === categoryName);
}

export function getCategoryStats(results: TestResult[], categoryName: string) {
  const catResults = getCategoryResults(results, categoryName);
  return {
    supported: catResults.filter((r) => r.status === "supported").length,
    partial: catResults.filter((r) => r.status === "partial").length,
    unsupported: catResults.filter((r) => r.status === "unsupported").length,
    total: catResults.length,
  };
}
